import { CommonModule } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { addDoc, collection, Firestore, serverTimestamp } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './image-uploader.component.html',
  styleUrls: ['./image-uploader.component.scss']
})
export class ImageUploaderComponent {
  @Input({ required: true }) category!: 'header' | 'gallery' | 'footer' | 'carousel';
  @Output() imageUploaded = new EventEmitter<string>();

  private readonly firestore = inject(Firestore);
  private readonly storage = inject(Storage);

  file?: File;
  uploadInProgress = false;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    this.file = input.files[0];
    this.uploadFile();
  }

  async uploadFile() {
    if (!this.file) return;

    this.uploadInProgress = true;
    const path = `images/${ this.category }/${ Date.now() }_${ this.file.name }`;
    const storageRef = ref(this.storage, path);

    await uploadBytes(storageRef, this.file);
    const url = await getDownloadURL(storageRef);

    await addDoc(collection(this.firestore, 'images'), {
      url,
      category: this.category,
      title: this.file.name,
      uploadedAt: serverTimestamp()
    });

    this.imageUploaded.emit(url);
    this.uploadInProgress = false;
  }
}
