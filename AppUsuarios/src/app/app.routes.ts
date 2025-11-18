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
    path: 'registrar-fichaje',
    loadComponent: () =>
      import('./pages/registrar-fichaje/registrar-fichaje.page').then(
        (m) => m.RegistrarFichajePage
      ),
  },
  {
    path: 'consulta-fichajes',
    loadComponent: () =>
      import('./pages/consulta-fichajes/consulta-fichajes.page').then(
        (m) => m.ConsultaFichajesPage
      ),
  },
];
