import { Component, inject } from '@angular/core';
import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { CardService } from '../../shared/services/cards.service';

@Component({
  selector: 'app-card-list',
  standalone: true,
  imports: [NgFor, NgIf, AsyncPipe],
  template: `
    <div *ngIf="cards$ | async as cards">
      <table>
        <tr>
          <th>Titre</th>
          <th>Slug</th>
          <th>Actions</th>
        </tr>
        <tr *ngFor="let card of cards">
          <td>{{ card.title }}</td>
          <td>{{ card.targetSlug }}</td>
          <td>
            <button (click)="delete(card.id!)">Supprimer</button>
          </td>
        </tr>
      </table>
    </div>
  `
})
export class CardListComponent {
  cardService = inject(CardService);
  cards$ = this.cardService.getAll();

  delete(id: string) {
    if (confirm('Confirmer la suppression ?')) {
      this.cardService.delete(id);
    }
  }
}
