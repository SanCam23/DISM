import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
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
];
