import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonLabel, IonButton, IonIcon, IonButtons, IonBackButton,
  IonModal, IonInput 
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { trashOutline, createOutline, add, closeOutline, saveOutline, briefcaseOutline } from 'ionicons/icons';
import { TrabajosService, Trabajo } from '../../services/trabajos';

@Component({
  selector: 'app-gestion-trabajos',
  templateUrl: './gestion-trabajos.page.html',
  styleUrls: ['./gestion-trabajos.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonBackButton,
    IonModal, IonInput
  ]
})
export class GestionTrabajosPage implements OnInit {
  
  isModalOpen = false;
  trabajos: Trabajo[] = [];
  
  trabajoActual: Trabajo = { Nombre: '' };
  esEdicion = false;

  constructor(private trabajosService: TrabajosService) { 
    addIcons({ trashOutline, createOutline, add, closeOutline, saveOutline, briefcaseOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.cargarTrabajos();
  }

  cargarTrabajos() {
    this.trabajosService.getTrabajos().subscribe({
      next: (res) => this.trabajos = res,
      error: (err) => console.error('Error cargando trabajos:', err)
    });
  }

  // Abrir modal para crear nuevo trabajo
  abrirModalCrear() {
    this.esEdicion = false;
    this.trabajoActual = { Nombre: '' };
    this.isModalOpen = true;
  }

  // Abrir modal para editar trabajo existente
  abrirModalEditar(t: Trabajo) {
    this.esEdicion = true;
    this.trabajoActual = { ...t };
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  // Guardar trabajo (crear o actualizar según contexto)
  guardarTrabajo() {
    if (!this.trabajoActual.Nombre.trim()) return;

    if (this.esEdicion) {
      this.trabajosService.updateTrabajo(this.trabajoActual.IdTrabajo!, this.trabajoActual).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarTrabajos();
        },
        error: (e) => console.error(e)
      });
    } else {
      this.trabajosService.createTrabajo(this.trabajoActual).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarTrabajos();
        },
        error: (e) => console.error(e)
      });
    }
  }

  borrarTrabajo(id: number) {
    if(!confirm('¿Eliminar este trabajo?')) return;
    this.trabajosService.deleteTrabajo(id).subscribe({
      next: () => this.cargarTrabajos(),
      error: (e) => console.error(e)
    });
  }
}