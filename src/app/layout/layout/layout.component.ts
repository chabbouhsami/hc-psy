import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from '../container/container.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <app-container>
      <router-outlet></router-outlet>
    </app-container>
    <app-footer></app-footer>
  `,
  imports: [
    ContainerComponent,
    HeaderComponent,
    RouterOutlet,
    FooterComponent
  ],
  standalone: true
})
export class LayoutComponent {}
