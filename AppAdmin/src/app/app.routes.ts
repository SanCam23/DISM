import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'gestion-usuarios',
    loadComponent: () => import('./pages/gestion-usuarios/gestion-usuarios.page').then( m => m.GestionUsuariosPage)
  },
  {
    path: 'gestion-trabajos',
    loadComponent: () => import('./pages/gestion-trabajos/gestion-trabajos.page').then( m => m.GestionTrabajosPage)
  },
  {
    path: 'gestion-fichajes',
    loadComponent: () => import('./pages/gestion-fichajes/gestion-fichajes.page').then( m => m.GestionFichajesPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
