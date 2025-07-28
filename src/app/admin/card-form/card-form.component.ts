import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardService } from '../../shared/services/cards.service';

@Component({
  selector: 'app-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <input type="text" formControlName="title" placeholder="Titre" />
      <input type="text" formControlName="subtitle" placeholder="Sous-titre" />
      <textarea formControlName="excerpt" placeholder="Texte d’accroche"></textarea>
      <input type="text" formControlName="imageUrl" placeholder="URL image" />
      <input type="text" formControlName="buttonText" placeholder="Texte du bouton" />
      <input type="text" formControlName="targetSlug" placeholder="Slug de la page cible" />

      <button type="submit" [disabled]="form.invalid">Ajouter</button>
    </form>
  `
})
export class CardFormComponent {
  form: FormGroup;

  @Output() submitted = new EventEmitter<void>();

  constructor(private readonly fb: FormBuilder, private readonly cardService: CardService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      excerpt: [''],
      imageUrl: [''],
      buttonText: ['En savoir plus'],
      targetSlug: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.form.valid) {
      await this.cardService.create(this.form.value);
      this.form.reset();
      this.submitted.emit();
    }
  }
}
