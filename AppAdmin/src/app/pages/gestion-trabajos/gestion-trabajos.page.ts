import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonLabel, IonButton, IonIcon, IonButtons, IonBackButton,
  IonModal, IonInput, IonFooter 
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
    IonModal, IonInput, IonFooter
  ]
})
export class GestionTrabajosPage implements OnInit {
  
  isModalOpen = false;
  trabajos: Trabajo[] = [];
  
  // Objeto temporal para el formulario
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

  // --- MODAL ---
  abrirModalCrear() {
    this.esEdicion = false;
    this.trabajoActual = { Nombre: '' };
    this.isModalOpen = true;
  }

  abrirModalEditar(t: Trabajo) {
    this.esEdicion = true;
    this.trabajoActual = { ...t }; // Copia para no modificar la lista directamente
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  // --- CRUD ---
  guardarTrabajo() {
    if (!this.trabajoActual.Nombre.trim()) return; // Validación básica

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