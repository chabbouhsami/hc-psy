import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SiteData } from '../../shared/models/site-data';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {
  private firestore = inject(Firestore);
  private sanitizer = inject(DomSanitizer);

  siteData = signal<SiteData | null>(null);
  mapUrl = signal<SafeResourceUrl | null>(null);

  constructor() {
    this.loadSiteData();
  }

  private async loadSiteData() {
    const ref = doc(this.firestore, 'siteData/infos');
    const snap = await getDoc(ref);
    const data = snap.exists() ? snap.data() as SiteData : null;
    this.siteData.set(data);

    if (data?.address) {
      const encoded = encodeURIComponent(data.address);
      const url = `https://www.google.com/maps?q=${ encoded }&output=embed`;
      this.mapUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(url));
    }
  }

  get currentYear() {
    return new Date().getFullYear();
  }
}
