import { Component } from '@angular/core';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-card-admin',
  standalone: true,
  template: `
    <h1>Administration des Cards</h1>
    <app-card-form (submitted)="reloadList()"></app-card-form>
    <app-card-list></app-card-list>
  `,
  imports: [
    CardFormComponent,
    CardListComponent
  ]
})
export class CardAdminComponent {
  reloadList() {
    // à implémenter si besoin plus tard
  }
}
