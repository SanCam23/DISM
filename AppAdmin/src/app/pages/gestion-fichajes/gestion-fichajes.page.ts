import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonIcon, IonButton, IonGrid, IonRow, IonCol,
  IonSelect, IonSelectOption, IonModal, IonDatetime, IonPopover, AlertController
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mapOutline, searchOutline, closeOutline, timeOutline } from 'ionicons/icons';
import { FichajesService, Fichaje } from '../../services/fichajes';
import { UsuariosService, Usuario } from '../../services/usuarios'; // Necesitamos cargar usuarios para el filtro
import * as L from 'leaflet';

@Component({
  selector: 'app-gestion-fichajes',
  templateUrl: './gestion-fichajes.page.html',
  styleUrls: ['./gestion-fichajes.page.scss'],
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
    IonList, IonItem, IonLabel, IonIcon, IonButton, IonGrid, IonRow, IonCol,
    IonSelect, IonSelectOption, IonModal, IonDatetime, IonPopover
  ]
})
export class GestionFichajesPage implements OnInit {

  fichajes: Fichaje[] = [];
  usuarios: Usuario[] = [];

  filtroUsuario: number | null = null;
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';

  isMapModalOpen = false;
  map: L.Map | undefined;

  constructor(
    private fichajesService: FichajesService,
    private usuariosService: UsuariosService,
    private alertCtrl: AlertController
  ) {
    addIcons({ mapOutline, searchOutline, closeOutline, timeOutline });
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    // Cargar listado de usuarios para selector
    this.usuariosService.getUsuarios().subscribe(res => this.usuarios = res);

    // Cargar fichajes iniciales sin filtros
    this.fichajesService.getFichajes().subscribe(res => this.fichajes = res);
  }

  async buscar() {

    // Validar selección de usuario antes de filtrar
    if (!this.filtroUsuario) {
      const alert = await this.alertCtrl.create({
        header: 'Atención',
        subHeader: 'Filtro incompleto',
        message: 'Por favor, selecciona un usuario de la lista antes de filtrar.',
        buttons: ['Entendido']
      });
      await alert.present();
      return;
    }

    // Preparar formato de fechas para consulta
    const inicio = this.filtroFechaInicio ? this.filtroFechaInicio.split('T')[0] : undefined;
    const fin = this.filtroFechaFin ? this.filtroFechaFin.split('T')[0] : undefined;

    // Ejecutar búsqueda con filtros aplicados
    this.fichajesService.getFichajesFiltrados(this.filtroUsuario, inicio, fin)
      .subscribe({
        next: (res) => this.fichajes = res,
        error: (err) => {
          console.error(err);
          this.fichajes = [];
        }
      });
  }

  // Abrir modal de mapa con geolocalización del fichaje
  abrirMapa(lat?: number, lon?: number) {
    if (!lat || !lon) {
      alert('Este fichaje no tiene coordenadas registradas.');
      return;
    }
    this.isMapModalOpen = true;

    // Esperar renderizado del modal antes de inicializar mapa
    setTimeout(() => {
      this.iniciarMapa(lat, lon);
    }, 300);
  }

  cerrarMapa() {
    this.isMapModalOpen = false;
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  iniciarMapa(lat: number, lon: number) {
    const container = document.getElementById('mapa-admin');
    if (!container) return;

    // Configurar iconos predeterminados de Leaflet
    const iconDefault = L.icon({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    // Eliminar instancia previa si existe
    if (this.map) {
      this.map.remove();
    }

    this.map = L.map('mapa-admin').setView([lat, lon], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap'
    }).addTo(this.map);

    L.marker([lat, lon]).addTo(this.map)
      .bindPopup('Ubicación del Fichaje')
      .openPopup();

    setTimeout(() => { this.map?.invalidateSize(); }, 100);
  }
}