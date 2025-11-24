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
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
