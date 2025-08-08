import { Injectable, OnInit, signal } from '@angular/core';
import { SiteData } from '../models/site-data';
import { AdminService } from './admin.service';

@Injectable({ providedIn: 'root' })
export class SiteDataService implements OnInit {
  private readonly _data = signal<SiteData | null>(null); // le signal mutable
  public readonly data = this._data.asReadonly(); // accès public en lecture seule

  constructor(private readonly adminService: AdminService) {
  }

  ngOnInit(): void {
    this.load()
  }

  getData(): SiteData | null {
    return this._data();
  }

  async load(): Promise<void> {
    const infos = await this.adminService.getInfos();
    this._data.set(infos ?? null); // OK ici
  }

  async update(newData: Partial<SiteData>): Promise<void> {
    const current = this._data() ?? {
      headerImageUrl: '',
      speciality: '',
      address: '',
      phone: '',
      name: '',
      adeli: '',
      id: '',
      email: ''
    };

    const merged: SiteData = {
      ...current,
      ...newData
    };

    await this.adminService.saveInfos(merged);
    this._data.set(merged); // plus d'erreur ici
  }


}
