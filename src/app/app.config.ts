import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideRouter } from '@angular/router';
import { firebaseConfig } from '../assets/firebase.config';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes),
      { provide: LOCALE_ID, useValue: 'fr' },
      provideFirebaseApp(() => initializeApp(firebaseConfig)),
      provideFirestore(() => getFirestore()),
      provideAuth(() => getAuth()),
      provideStorage(() => getStorage())]
  }
;
