import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonList, IonLabel, IonItem,
  IonSelect, IonSelectOption, IonCard, IonCardHeader,
  IonCardTitle, IonCardContent, AlertController
} from '@ionic/angular/standalone';
import { Geolocation } from '@capacitor/geolocation';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import * as Leaflet from 'leaflet';
import { icon, Marker } from 'leaflet';
import { FichajesService } from '../../services/fichajes.service';
import { TrabajosService } from '../../services/trabajos.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-registrar-fichaje',
  standalone: true,
  templateUrl: './registrar-fichaje.page.html',
  styleUrls: ['./registrar-fichaje.page.scss'],
  imports: [
    FormsModule,
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonList, IonLabel, IonItem, IonSelect, IonSelectOption, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent
  ],
})
export class RegistrarFichajePage {
  latitud?: number;
  longitud?: number;
  direccionGeorreferenciada?: string;
  trabajos: any[] = [];
  trabajoSeleccionado?: number;
  usuarioLogueado: any = null;
  fichajeActivo: any = null;
  map?: Leaflet.Map;

  constructor(
    private fichajesService: FichajesService,
    private trabajosService: TrabajosService,
    private usuariosService: UsuariosService,
    private http: HttpClient,
    private alertCtrl: AlertController
  ) {}

  async ionViewWillEnter() {
    this.obtenerUsuarioLogueado();
    this.obtenerTrabajos();
  }

  obtenerUsuarioLogueado() {
    const usuarioGuardado = localStorage.getItem('usuarioLogueado');
    if (usuarioGuardado) {
      this.usuarioLogueado = JSON.parse(usuarioGuardado);
      this.comprobarFichaje();
    } else {
      alert('No hay usuario logueado. Por favor, inicia sesión.');
    }
  }

  obtenerTrabajos() {
    this.trabajosService.getTrabajos().subscribe({
      next: res => this.trabajos = res,
      error: err => console.error('Error cargando trabajos', err)
    });
  }

  comprobarFichaje() {
    if (!this.usuarioLogueado) return;
    this.fichajesService.getFichajeActual(this.usuarioLogueado.IdUsuario).subscribe({
      next: data => this.fichajeActivo = data,
      error: () => this.fichajeActivo = null
    });
  }

  async locate() {
    const coordinates = await Geolocation.getCurrentPosition();
    this.latitud = coordinates.coords.latitude;
    this.longitud = coordinates.coords.longitude;

    const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${this.latitud}&lon=${this.longitud}&addressdetails=1`;
    this.http.get(url).subscribe((data: any) => {
      this.direccionGeorreferenciada = data.display_name;
    });

    setTimeout(() => {
      this.cargarMapa();
    }, 100);
  }

  cargarMapa() {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }

    // Configurar iconos de marcadores de Leaflet
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    Marker.prototype.options.icon = iconDefault;

    this.map = Leaflet.map('mapId').setView([this.latitud!, this.longitud!], 15);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(this.map);

    Leaflet.marker([this.latitud!, this.longitud!])
      .addTo(this.map)
      .bindPopup('Ubicación actual')
      .openPopup();
  }

  // Registrar fichaje de entrada con validación de datos
  registrarEntrada() {
    if (!this.usuarioLogueado || !this.trabajoSeleccionado || !this.latitud || !this.longitud) {
      alert('Selecciona trabajo y asegúrate de tener geolocalización.');
      return;
    }

    const data = {
      IdUsuario: this.usuarioLogueado.IdUsuario,
      IdTrabajo: this.trabajoSeleccionado,
      GeolocalizacionLatitud: this.latitud,
      GeolocalizacionLongitud: this.longitud,
    };

    this.fichajesService.createFichaje(data).subscribe(async res => {
      const alert = await this.alertCtrl.create({
        header: 'Fichaje registrado',
        message: res.message,
        buttons: ['OK'],
      });
      await alert.present();
      this.comprobarFichaje();
      
      this.limpiarCampos();
    });
  }

  // Finalizar fichaje activo
  finalizarFichaje() {
    this.fichajesService.finalizarFichaje(this.fichajeActivo.IdFichaje).subscribe(async res => {
      const alert = await this.alertCtrl.create({
        header: 'Fichaje finalizado',
        message: `Horas trabajadas: ${res.horasTrabajadas}`,
        buttons: ['OK'],
      });
      await alert.present();
      this.fichajeActivo = null;
      this.limpiarCampos();
    });
  }

  // Limpiar formulario y mapa
  limpiarCampos() {
    this.trabajoSeleccionado = undefined;
    this.latitud = undefined;
    this.longitud = undefined;
    this.direccionGeorreferenciada = undefined;
    
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  // Limpiar recursos del mapa al salir de la página
  ionViewWillLeave() {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }
}