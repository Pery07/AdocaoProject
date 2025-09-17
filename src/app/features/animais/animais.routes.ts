import { Routes } from '@angular/router';
export const ANIMAIS_ROUTES: Routes = [
  { path: '', loadComponent: () => import('./lista-animais.page').then(m => m.ListaAnimaisPage) },
  { path: ':id', loadComponent: () => import('./detalhe-animal.page').then(m => m.DetalheAnimalPage) }
];
