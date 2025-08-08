import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rendez-vous',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './rendez-vous.component.html',
  styleUrls: ['./rendez-vous.component.scss']
})
export class RendezVousComponent {
  formData = {
    nom: '',
    email: '',
    tel: '',
    date: '',
    message: ''
  };

  submitForm() {
    // Pour le moment, on simule un envoi
    console.log('Formulaire envoyé :', this.formData);
    alert('Votre demande a été enregistrée. Nous vous contacterons rapidement.');
    // Reset optionnel :
    this.formData = { nom: '', email: '', tel: '', date: '', message: '' };
  }
}
