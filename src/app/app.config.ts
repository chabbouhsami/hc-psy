import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import firebase from 'firebase/compat';

import { routes } from './app.routes';
import initializeApp = firebase.initializeApp;

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),]
};
