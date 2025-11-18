import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem,
  IonLabel, IonSelect, IonSelectOption, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, IonDatetime, IonText
} from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { FichajesService } from '../../services/fichajes.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-consulta-fichajes',
  standalone: true,
  templateUrl: './consulta-fichajes.page.html',
  styleUrls: ['./consulta-fichajes.page.scss'],
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonItem, IonLabel, IonSelect, IonSelectOption, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent, IonDatetime, IonText
  ],
})
export class ConsultaFichajesPage {
  usuarios: any[] = [];
  usuarioSeleccionado?: number;
  fechaInicio?: string;
  fichajes: any[] = [];
  consultaRealizada = false;

  constructor(
    private fichajesService: FichajesService,
    private usuariosService: UsuariosService
  ) {}

  ionViewWillEnter() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: res => this.usuarios = res,
      error: err => console.error('Error cargando usuarios', err)
    });
  }

  consultarFichajes() {
    if (!this.usuarioSeleccionado || !this.fechaInicio) {
      alert('Debe seleccionar usuario y una fecha.');
      return;
    }

    const fechaFormateada = this.fechaInicio.split('T')[0];

    this.fichajesService.getFichajesByUsuario(this.usuarioSeleccionado, fechaFormateada)
      .subscribe({
        next: res => {
          this.fichajes = res;
          this.consultaRealizada = true;
        },
        error: err => {
          console.error('Error consultando fichajes', err);
          this.fichajes = [];
          this.consultaRealizada = true;
        }
      });
  }
}
