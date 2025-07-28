import { Component, OnInit } from '@angular/core';
import { CardService } from '../../shared/services/cards.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  cards: any[] = [];

  constructor(private readonly cardService: CardService) {}

  ngOnInit() {
    this.cardService.getAll().subscribe(cards => {
      this.cards = cards;
    });
  }


}
