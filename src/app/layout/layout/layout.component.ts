import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ContainerComponent } from '../container/container.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderMenuComponent } from '../header/header-menu/header-menu.component';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-layout',
  template: `
    <app-header></app-header>
    <app-header-menu></app-header-menu>
    <app-container>
      <router-outlet></router-outlet>
    </app-container>
    <app-footer></app-footer>
  `,
  standalone: true,
  imports: [
    ContainerComponent,
    HeaderComponent,
    RouterOutlet,
    FooterComponent,
    HeaderMenuComponent
  ]
})
export class LayoutComponent {}
