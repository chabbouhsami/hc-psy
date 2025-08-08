import { CommonModule } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
import { SiteData } from '../../shared/models/site-data';
import { AdminService } from '../../shared/services/admin.service';

@Component({
  selector: 'app-admin-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ImageUploaderComponent],
  templateUrl: './admin-settings.component.html',
  styleUrls: ['./admin-settings.component.scss']
})
export class AdminSettingsComponent {
  private readonly service = inject(AdminService);

  infos = signal<SiteData>({
    name: '',
    phone: '',
    email: '',
    address: '',
    adeli: '',
    speciality: '',
    headerImageUrl: ''
  });

  constructor() {
    effect(async () => {
      const result = await this.service.getInfos();
      this.infos.set(result);
    });
  }

  saveInfos() {
    this.service.saveInfos(this.infos());
    alert('Informations enregistrées');
  }

  updateHeaderImage(url: string) {
    console.log(url)
    this.infos.update(i => ({ ...i, headerImageUrl: url }));
  }
}
