import { Routes } from '@angular/router';

export const routes: Routes = [
  // --- Pages publiques ---
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'page/:slug',
    loadComponent: () => import('./pages/page-viewer/page-viewer.component').then(m => m.PageViewerComponent)
  },
  /*{
    path: 'a-propos',
    loadComponent: () => import('./pages/a-propos/a-propos.component').then(m => m.AProposComponent)
  },*/
  {
    path: 'contact',
    loadComponent: () => import('./pages/contact-tarif/contact-tarif.component').then(m => m.ContactTarifComponent)
  },
  {
    path: 'prendre-rendez-vous',
    loadComponent: () => import('./pages/rendez-vous/rendez-vous.component').then(m => m.RendezVousComponent)
  },

  // --- Pages d'administration ---
  {
    path: 'admin/login',
    loadComponent: () => import('./admin/admin-login/admin-login.component').then(m => m.AdminLoginComponent)
  },
  {
    path: 'admin/dashboard',
    loadComponent: () => import('./admin/admin-dashboard/admin-dashboard.component').then(
      m => m.AdminDashboardComponent)
  },
  {
    path: 'admin/tarifs',
    loadComponent: () => import('./admin/admin-tarifs/admin-tarifs.component').then(
      m => m.AdminTarifsComponent)
  },
  {
    path: 'admin/site',
    loadComponent: () => import('./admin/admin-settings/admin-settings.component').then(m => m.AdminSettingsComponent)
  },
  {
    path: 'admin/images',
    loadComponent: () => import('./admin/image-uploader/image-uploader.component').then(
      m => m.ImageUploaderComponent)
  },
  {
    path: 'admin/cards',
    loadComponent: () => import('./admin/card-admin/card-admin.component').then(
      m => m.CardAdminComponent)
  },

  // --- Page 404 ---
  {
    path: '**',
    redirectTo: ''
  }
];
