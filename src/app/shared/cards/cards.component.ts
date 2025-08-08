import { NgOptimizedImage } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  imports: [
    NgOptimizedImage,
  ],
  templateUrl: './cards.component.html',
  standalone: true,
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() title!: string;
  @Input() subtitle?: string;
  @Input() excerpt?: string;
  @Input() imageUrl?: string;
  @Input() buttonText = 'En savoir plus';
  @Input() targetSlug!: string;
}
