import { Routes } from '@angular/router';
export const ONG_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./ong-dashboard.page').then(m => m.OngDashboardPage) }
];
