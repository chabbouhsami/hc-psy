import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Card } from '../models/cards';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() cards: Card | undefined;

}
