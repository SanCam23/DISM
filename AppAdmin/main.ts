import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// --- NUEVOS IMPORTS ---
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { apiKeyInterceptor } from './app/interceptors/apikey.interceptor'; // <--- RUTA CORRECTA

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    // Asegúrate de que el interceptor está AQUÍ
    provideHttpClient(withInterceptors([apiKeyInterceptor])), // <--- ¡CLAVE!
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});