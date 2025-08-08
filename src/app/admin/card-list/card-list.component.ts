import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Card } from '../../shared/models/cards';
import { CardService } from '../../shared/services/cards.service';
import { ImageUploadService } from '../../shared/services/image-upload.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [AsyncPipe, FormsModule, EditorModule],
  templateUrl: 'card-list.component.html',
  styleUrls: ['card-list.component.scss']
})
export class CardListComponent {
  cardService = inject(CardService);
  imageService = inject(ImageUploadService);
  cards$ = this.cardService.getAll();
  previousImageUrl: string | null = null;

  selectedCard: Card | null = null;

  openModal(card: Card) {
    this.selectedCard = { ...card }; // clone pour ne pas modifier en live
  }

  closeModal() {
    this.selectedCard = null;
  }

  async saveChanges() {
    if (this.selectedCard?.id) {
      await this.cardService.update(this.selectedCard.id, this.selectedCard);
      this.closeModal();
    }
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];

    // Sauvegarde temporaire de l'ancienne image (si elle existe)
    if (this.selectedCard?.imageUrl) {
      this.previousImageUrl = this.selectedCard.imageUrl;
    }

    this.imageService.uploadImage(file, 'cards')
      .then(url => {
        this.selectedCard!.imageUrl = url;

        // Supprime l’ancienne image une fois la nouvelle uploadée
        if (this.previousImageUrl) {
          this.imageService.deleteImageFromUrl(this.previousImageUrl)
            .catch(error => console.warn('Erreur suppression image précédente :', error));
          this.previousImageUrl = null;
        }
      });
  }

  async delete(id: string): Promise<void> {
    if (this.selectedCard?.id) {
      await this.cardService.delete(this.selectedCard.id);
    }

  }
}
