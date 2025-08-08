import { AsyncPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CardsComponent } from '../../shared/cards/cards.component';
import { Card } from '../../shared/models/cards';
import { CardService } from '../../shared/services/cards.service';

@Component({
  selector: 'app-home',
  imports: [
    AsyncPipe, CardsComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  cards: any[] = [];
  protected cards$!: Observable<Card[]>;

  constructor(private readonly cardService: CardService) {}

  ngOnInit() {
    this.cards$ = this.cardService.getAll();
  }
}
