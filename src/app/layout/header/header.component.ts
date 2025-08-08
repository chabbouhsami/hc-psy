import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { RouterModule } from '@angular/router';
import { SiteData } from '../../shared/models/site-data';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  private readonly firestore = inject(Firestore);
  siteData = signal<SiteData | null>(null);

  constructor() {
    this.loadSiteData();
  }

  private async loadSiteData() {
    const ref = doc(this.firestore, 'siteData/infos');
    const snap = await getDoc(ref);
    if (snap.exists()) {
      this.siteData.set(snap.data() as any);
    }
  }
}
