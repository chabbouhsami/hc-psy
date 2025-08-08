import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';
import { CardService } from '../../shared/services/cards.service';
import { ImageUploadService } from '../../shared/services/image-upload.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, EditorComponent],
  styleUrl: 'card-form.component.scss',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="title" placeholder="Titre"/>
      <input type="text" formControlName="subtitle" placeholder="Titre de la carte"/>
      <textarea formControlName="excerpt" placeholder="Description brève"></textarea>
      <input type="file" (change)="onFileSelected($event)"/>
      <input type="text" formControlName="targetSlug" placeholder="Slug de la page cible"/>
      <editor
        apiKey="dnzujvfktmyrqgfk1ge5wveoeyns94r8gc6hu81vw2ppj1hf"
        formControlName="content"
        [init]="{
        height: 300,
        menubar: false,
        plugins: 'link image code lists',
        toolbar: 'undo redo | formatselect | bold italic underline | bullist numlist | link image | code',
        branding: false
    }"
      ></editor>
      <button type="submit" [disabled]="form.invalid">Ajouter</button>
    </form>
  `
})
export class CardFormComponent {
  form: FormGroup;

  @Output() submitted = new EventEmitter<void>();

  constructor(private readonly fb: FormBuilder,
              private readonly cardService: CardService,
              private readonly imageService: ImageUploadService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      excerpt: [''],
      imageUrl: [''],
      targetSlug: ['', Validators.required],
      content: ['', Validators.required],
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      await this.cardService.create(this.form.value);
      this.form.reset();
      this.submitted.emit();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    this.imageService.uploadImage(file, 'cards')
      .then(url => {
        this.form.patchValue({ imageUrl: url });
      });
  }
}
