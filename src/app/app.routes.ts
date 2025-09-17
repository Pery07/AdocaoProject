import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./features/home/home.page').then(m => m.HomePage) },
  { path: 'animais', loadChildren: () => import('./features/animais/animais.routes').then(m => m.ANIMAIS_ROUTES) },
  { path: 'favoritos', loadComponent: () => import('./features/favoritos/favoritos.page').then(m => m.FavoritosPage) },
  { path: 'minhas-adocoes', loadComponent: () => import('./features/adocoes/adocoes.page').then(m => m.AdocoesPage) },
  { path: 'ong', loadChildren: () => import('./features/ong/ong.routes').then(m => m.ONG_ROUTES) },
  { path: 'perfil', loadComponent: () => import('./features/perfil/perfil.page').then(m => m.PerfilPage) },
  { path: 'login', loadComponent: () => import('./features/auth/auth.page').then(m => m.LoginPage) },
  { path: '**', redirectTo: '' }
];
