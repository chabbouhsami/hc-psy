import { Routes } from '@angular/router';
import { PageViewerComponent } from './pages/page-viewer/page-viewer.component';

export const routes: Routes = [
  { path: 'page/:slug', component: PageViewerComponent }

];
