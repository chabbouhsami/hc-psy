import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../../shared/models/cards';
import { CardService } from '../../shared/services/cards.service';

@Component({
  selector: 'app-page-viewer',
  standalone: true,
  templateUrl: './page-viewer.component.html',
})
export class PageViewerComponent implements OnInit {
  protected page: Card | null = null;
  protected content: SafeHtml = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly cardService: CardService,
    private readonly sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');
    if (slug) {
      this.cardService.getById(slug).subscribe(card => {
        this.page = card;
        this.content = this.sanitizer.bypassSecurityTrustHtml(card.content);
      });
    }
  }
}
