import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private storage: Storage) {}

  uploadImage(file: File, folder: string = 'uploads'): Promise<string> {
    const filePath = `${ folder }/${ Date.now() }_${ file.name }`;
    const storageRef = ref(this.storage, filePath);

    return uploadBytes(storageRef, file)
      .then(() => getDownloadURL(storageRef));
  }

  deleteImageFromUrl(url: string): Promise<void> {
    const baseUrl = 'https://firebasestorage.googleapis.com/v0/b/';
    if (!url.startsWith(baseUrl)) {
      return Promise.resolve(); // On ignore les URLs non Firebase
    }

    const pathStart = url.indexOf('/o/') + 3;
    const pathEnd = url.indexOf('?');
    const filePath = decodeURIComponent(url.slice(pathStart, pathEnd));

    const fileRef = ref(this.storage, filePath);
    return deleteObject(fileRef);
  }
}
