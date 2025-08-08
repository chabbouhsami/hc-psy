import { Component } from '@angular/core';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardListComponent } from '../card-list/card-list.component';

@Component({
  selector: 'app-card-admin',
  standalone: true,
  templateUrl: 'card-admin.component.html',
  styleUrl: 'card-admin.component.scss',
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
