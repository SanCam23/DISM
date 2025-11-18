// home.page.ts
import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular'; // Importar AlertController
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { FichajesService } from '../services/fichajes.service'; // Importar FichajesService

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  imports: [IonicModule, CommonModule, RouterModule],
})
export class HomePage {
  constructor(
    private router: Router,
    private fichajesService: FichajesService, // Inyectar el servicio
    private alertCtrl: AlertController // Inyectar el controlador de alertas
  ) {}

  // --- NUEVA FUNCIÓN ---
  async ejecutarCierreManual() {
    const alertEspera = await this.alertCtrl.create({
      header: 'Procesando...',
      message: 'Ejecutando cierre de fichajes antiguos. Por favor, espere.',
      backdropDismiss: false,
    });
    await alertEspera.present();

    this.fichajesService.cerrarFichajesAntiguosManual().subscribe({
      next: async (res) => {
        await alertEspera.dismiss(); // Cerrar alerta de espera
        
        // Mostrar alerta de éxito
        const alertExito = await this.alertCtrl.create({
          header: 'Proceso Completado',
          message: `Se han cerrado ${res.fichajesCerrados} fichajes.`,
          buttons: ['OK'],
        });
        await alertExito.present();
      },
      error: async (err) => {
        await alertEspera.dismiss(); // Cerrar alerta de espera
        
        // Mostrar alerta de error
        const alertError = await this.alertCtrl.create({
          header: 'Error',
          message: 'No se pudo completar el proceso. ' + (err.error?.error || err.message),
          buttons: ['OK'],
        });
        await alertError.present();
      }
    });
  }
  // --- FIN NUEVA FUNCIÓN ---
}