import { Injectable } from '@angular/core';
import {
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc
} from '@angular/fire/firestore';
import firebase from 'firebase/compat';
import { Observable } from 'rxjs';
import { collection as colRef, query } from 'firebase/firestore';
import { Card } from '../models/cards';
import Firestore = firebase.firestore.Firestore;

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private readonly collectionPath = 'cards';

  constructor(private readonly firestore: Firestore) {}

  // 🔹 Récupérer toutes les cards
  getAll(): Observable<Card[]> {
    const ref = collection(this.firestore, this.collectionPath);
    return collectionData(ref, { idField: 'id' }) as Observable<Card[]>;
  }

  // 🔹 Récupérer une card par son ID (ou slug, s’il est utilisé comme ID Firestore)
  getById(id: string): Observable<Card> {
    const ref = doc(this.firestore, `${this.collectionPath}/${id}`);
    return docData(ref, { idField: 'id' }) as Observable<Card>;
  }

  // 🔹 Créer ou écraser une card
  async create(card: Card): Promise<void> {
    const ref = doc(this.firestore, `${this.collectionPath}/${card.targetSlug}`);
    await setDoc(ref, {
      ...card,
      createdAt: new Date(),
      updatedAt: new Date()
    });
  }

  // 🔹 Mettre à jour une card
  async update(id: string, changes: Partial<Card>): Promise<void> {
    const ref = doc(this.firestore, `${this.collectionPath}/${id}`);
    await updateDoc(ref, {
      ...changes,
      updatedAt: new Date()
    });
  }

  // 🔹 Supprimer une card
  async delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `${this.collectionPath}/${id}`);
    await deleteDoc(ref);
  }
}
