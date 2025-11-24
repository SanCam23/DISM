import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// --- CORRECCIÓN 1: Añadir 'withInterceptors' a los imports ---
import { provideHttpClient, withInterceptors } from '@angular/common/http'; 

// --- CORRECCIÓN 2: Ruta más limpia (asumiendo que estás en src/main.ts) ---
import { apiKeyInterceptor } from './app/interceptors/apikey.interceptor'; 

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // Ahora 'withInterceptors' ya estará definido y no dará error
    provideHttpClient(withInterceptors([apiKeyInterceptor])),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});