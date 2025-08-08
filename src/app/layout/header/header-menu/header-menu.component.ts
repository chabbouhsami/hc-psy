import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header-menu',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header-menu.component.html',
  styleUrls: ['./header-menu.component.scss']
})
export class HeaderMenuComponent {
  menuOpen = signal(false);

  toggleMenu() {
    this.menuOpen.update(open => !open);
  }

  closeMenu() {
    this.menuOpen.set(false);
  }

  links = [
    { label: 'Accueil', path: '/' },
    { label: 'Questions fréquentes', path: '/questions' },
    { label: 'Qui suis-je ?', path: '/qui-suis-je' },
    { label: 'EMDR', path: '/emdr' },
    { label: 'Contact & Tarifs', path: '/contact' },
  ];
}
