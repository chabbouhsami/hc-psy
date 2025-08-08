import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  doc,
  getDoc,
  setDoc
} from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AdminService {
  firestore = inject(Firestore);

  async getInfos() {
    const ref = doc(this.firestore, 'siteData/infos');
    const snap = await getDoc(ref);
    return snap.exists() ? snap.data() as any : {};
  }

  async saveInfos(infos: any) {
    const ref = doc(this.firestore, 'siteData/infos');
    await setDoc(ref, infos, { merge: true });
  }
}
