import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, 
  IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, 
  IonInput, IonButton, IonIcon, IonGrid, IonRow, IonCol, AlertController 
} from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios';
import { addIcons } from 'ionicons';
import { personCircleOutline, personOutline, lockClosedOutline, logInOutline } from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, 
    IonCardTitle, IonCardSubtitle, IonCardContent, IonItem, IonLabel, 
    IonInput, IonButton, IonIcon, IonGrid, IonRow, IonCol
  ]
})
export class LoginPage {

  credenciales = { Usuario: '', Clave: '' };

  constructor(
    private usuariosService: UsuariosService, 
    private router: Router,
    private alertCtrl: AlertController
  ) {
    addIcons({ personCircleOutline, personOutline, lockClosedOutline, logInOutline });
  }

  iniciarSesion() {
    this.usuariosService.login(this.credenciales.Usuario, this.credenciales.Clave).subscribe({
      next: async (res) => {
        
        // Validar acceso exclusivo para administradores
        if (res.usuario.Usuario === 'Admin') {
          console.log('Acceso concedido a Admin');
          this.router.navigate(['/home']);
        } else {
          // Denegar acceso a usuarios no administradores
          const alert = await this.alertCtrl.create({
            header: 'Acceso Denegado',
            message: 'Esta aplicación es exclusiva para administradores.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Error',
          message: 'Credenciales incorrectas.',
          buttons: ['OK']
        });
        await alert.present();
        console.error(err);
      }
    });
  }
}