import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { UsuariosService } from '../../services/usuarios.service';
import { addIcons } from 'ionicons';
import { 
  personCircleOutline, 
  personOutline, 
  lockClosedOutline, 
  logInOutline 
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonLabel, IonInput, IonButton, IonIcon, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonCardSubtitle]
})
export class LoginPage {
  credenciales = { Usuario: '', Clave: '' };

  constructor(private usuariosService: UsuariosService, private router: Router) {
    addIcons({ 
      personCircleOutline, 
      personOutline, 
      lockClosedOutline, 
      logInOutline 
    });
  }

  iniciarSesion() {
    this.usuariosService.login(this.credenciales.Usuario, this.credenciales.Clave).subscribe({
      next: (res) => {
        console.log('Login correcto:', res);
        // Almacenar información de sesión
        localStorage.setItem('usuarioLogueado', JSON.stringify(res.usuario));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        alert('Error: Credenciales incorrectas');
        console.error(err);
      }
    });
  }
}