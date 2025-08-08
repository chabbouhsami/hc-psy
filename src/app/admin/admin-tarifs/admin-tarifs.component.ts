import { CommonModule } from '@angular/common';
import { Component, inject, Signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Tarif } from '../../shared/models/tarif';
import { TarifsService } from '../../shared/services/tarifs.service';

@Component({
  selector: 'app-admin-tarifs',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-tarifs.component.html',
  styleUrls: ['./admin-tarifs.component.scss']
})
export class AdminTarifsComponent {
  private readonly tarifService = inject(TarifsService);

  tarifs = this.tarifService.data;

  modalOpen = false;
  editingTarif: Tarif | null = null;

  currentTarif: Tarif = {
    titre: '',
    prix: 0,
    description: ''
  };

  openModal(): void {
    this.editingTarif = null;
    this.currentTarif = { titre: '', prix: 0, description: '' };
    this.modalOpen = true;
  }

  editTarif(t: Tarif): void {
    this.editingTarif = t;
    this.currentTarif = { ...t };
    this.modalOpen = true;
  }

  async saveTarif(): Promise<void> {
    if (this.editingTarif?.id) {
      await this.tarifService.updateTarif({ ...this.currentTarif, id: this.editingTarif.id });
    } else {
      await this.tarifService.addTarif(this.currentTarif);
    }
    this.modalOpen = false;
  }

  closeModal(): void {
    this.modalOpen = false;
  }

  async deleteTarif(t: Tarif): Promise<void> {
    await this.tarifService.deleteTarif(t);
  }
}
