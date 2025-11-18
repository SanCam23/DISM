import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton,
  IonList, IonItem, IonLabel, IonNote, IonIcon, IonButton, IonGrid, IonRow, IonCol,
  IonSelect, IonSelectOption, IonDatetimeButton, IonModal, IonDatetime, IonPopover, AlertController
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
    IonList, IonItem, IonLabel, IonNote, IonIcon, IonButton, IonGrid, IonRow, IonCol,
    IonSelect, IonSelectOption, IonDatetimeButton, IonModal, IonDatetime, IonPopover
  ]
})
export class GestionFichajesPage implements OnInit {

  fichajes: Fichaje[] = [];
  usuarios: Usuario[] = [];

  // Filtros
  filtroUsuario: number | null = null;
  filtroFechaInicio: string = '';
  filtroFechaFin: string = '';

  // Mapa
  isMapModalOpen = false;
  map: L.Map | undefined;

  constructor(
    private fichajesService: FichajesService,
    private usuariosService: UsuariosService,
    private alertCtrl: AlertController // 3. AQUÍ SÍ (Inyección)
  ) {
    addIcons({ mapOutline, searchOutline, closeOutline, timeOutline });
  }

  ngOnInit() {
    this.cargarDatosIniciales();
  }

  cargarDatosIniciales() {
    // 1. Cargar Usuarios para el Select
    this.usuariosService.getUsuarios().subscribe(res => this.usuarios = res);

    // 2. Cargar todos los fichajes al principio
    this.fichajesService.getFichajes().subscribe(res => this.fichajes = res);
  }

  async buscar() { // <--- Nota: Ahora debe ser ASYNC para usar await con la alerta

    // 1. VALIDACIÓN: Si no hay usuario seleccionado, error y paramos.
    if (!this.filtroUsuario) {
      const alert = await this.alertCtrl.create({
        header: 'Atención',
        subHeader: 'Filtro incompleto',
        message: 'Por favor, selecciona un usuario de la lista antes de filtrar.',
        buttons: ['Entendido']
      });
      await alert.present();
      return; // <--- IMPORTANTE: Esto detiene la función aquí.
    }

    // 2. Preparación de fechas
    const inicio = this.filtroFechaInicio ? this.filtroFechaInicio.split('T')[0] : undefined;
    const fin = this.filtroFechaFin ? this.filtroFechaFin.split('T')[0] : undefined;

    // 3. Ejecución de la búsqueda (Solo entramos aquí si pasó la validación)
    this.fichajesService.getFichajesFiltrados(this.filtroUsuario, inicio, fin)
      .subscribe({
        next: (res) => this.fichajes = res,
        error: (err) => {
          console.error(err);
          this.fichajes = []; // Limpiar lista si hay error
        }
      });
  }

  // --- LÓGICA DEL MAPA ---
  abrirMapa(lat?: number, lon?: number) {
    if (!lat || !lon) {
      alert('Este fichaje no tiene coordenadas registradas.');
      return;
    }
    this.isMapModalOpen = true;

    // Esperamos un poco a que el modal se abra para pintar el mapa
    setTimeout(() => {
      this.iniciarMapa(lat, lon);
    }, 300);
  }

  cerrarMapa() {
    this.isMapModalOpen = false;
    if (this.map) {
      this.map.remove(); // Limpiamos la instancia del mapa
      this.map = undefined;
    }
  }

  iniciarMapa(lat: number, lon: number) {
    const container = document.getElementById('mapa-admin');
    if (!container) return;

    // --- CORRECCIÓN DE ICONOS LEAFLET ---
    // Esto soluciona el problema del marcador invisible
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
    // ------------------------------------

    // Si ya existe mapa, lo borramos para no duplicar
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