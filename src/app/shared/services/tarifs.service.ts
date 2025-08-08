import { Injectable, Signal, signal, WritableSignal } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  updateDoc,
} from '@angular/fire/firestore';
import { Tarif } from '../models/tarif';

@Injectable({ providedIn: 'root' })
export class TarifsService {
  private readonly col: CollectionReference<Tarif>;

  private readonly _data: WritableSignal<Tarif[]> = signal<Tarif[]>([]);
  public readonly data: Signal<Tarif[]> = this._data.asReadonly();

  constructor(private readonly firestore: Firestore) {
    this.col = collection(this.firestore, 'tarifs') as CollectionReference<Tarif>;
  }

  async load(): Promise<void> {
    const tarifs = await getDocs(this.col);
    const dataList: Tarif[] = tarifs.docs.map(doc => ({ id: doc.id, ...doc.data() } as Tarif));
    this._data.set(dataList);
  }

  getAll() {
    return collectionData(this.col, { idField: 'id' });
  }

  async addTarif(tarif: Tarif): Promise<void> {
    await addDoc(this.col, tarif);
  }

  async updateTarif(tarif: Tarif): Promise<void> {
    if (!tarif.id) return;

    const docRef: DocumentReference<Tarif> = doc(this.col, tarif.id);

    // Retire le champ `id` de l'objet à mettre à jour
    const { id, ...data } = tarif;

    await updateDoc(docRef, data);
  }


  async deleteTarif(tarif: Tarif): Promise<void> {
    if (tarif.id) {
      const docRef: DocumentReference<Tarif> = doc(this.col, tarif.id);
      await deleteDoc(docRef);
    } else {
      console.log(`Reference ${ JSON.stringify(tarif) } is empty`)
    }
  }
}
