import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { SiteDataService } from '../../shared/services/site-data.service';
import { TarifsService } from '../../shared/services/tarifs.service';

@Component({
  selector: 'app-contact-tarif',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact-tarif.component.html',
  styleUrls: ['./contact-tarif.component.scss']
})
export class ContactTarifComponent implements OnInit {
  siteDataService = inject(SiteDataService);
  data = this.siteDataService.data;

  private readonly tarifService = inject(TarifsService);
  tarifs = this.tarifService.data;


  async ngOnInit(): Promise<void> {
    await this.siteDataService.load(); // remplit le signal
    await this.tarifService.load();

    if (this.data()) {
      // les données sont accessibles via this.data()
      console.log(this.data());
    }
  }

}
