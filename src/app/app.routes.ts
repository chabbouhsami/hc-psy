import { Routes } from '@angular/router';
import { CardAdminComponent } from './admin/card-admin/card-admin.component';
import { PageViewerComponent } from './pages/page-viewer/page-viewer.component';

export const routes: Routes = [
  { path: 'page/:slug', component: PageViewerComponent },
  { path: 'admin/cards', component: CardAdminComponent }


];
