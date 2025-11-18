import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonLabel, IonButton, IonIcon, IonButtons, IonBackButton,
  IonModal, IonInput, IonFooter // <--- Importamos componentes del Modal
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons'; 
import { trashOutline, createOutline, add, closeOutline, saveOutline } from 'ionicons/icons';
import { UsuariosService, Usuario } from '../../services/usuarios';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.page.html',
  styleUrls: ['./gestion-usuarios.page.scss'],
  standalone: true,
  imports: [
    IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    IonList, IonItem, IonLabel, IonButton, IonIcon, IonButtons, IonBackButton,
    IonModal, IonInput, IonFooter
  ]
})
export class GestionUsuariosPage implements OnInit {
  
  // Variable para controlar el modal
  isModalOpen = false;

  usuarios: Usuario[] = [];

  // Objeto para el formulario (lo usaremos para crear y editar)
  usuarioActual: Usuario = {
    Nombre: '',
    Usuario: '',
    Clave: ''
  };

  esEdicion = false;

  constructor(private usuariosService: UsuariosService) { 
    addIcons({ trashOutline, createOutline, add, closeOutline, saveOutline });
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.usuariosService.getUsuarios().subscribe({
      next: (res) => this.usuarios = res,
      error: (err) => console.error('Error al cargar:', err)
    });
  }

  // --- LÓGICA DEL MODAL ---

  // Abrir para CREAR
  abrirModalCrear() {
    this.esEdicion = false;
    this.usuarioActual = { Nombre: '', Usuario: '', Clave: '' }; // Limpiar formulario
    this.isModalOpen = true;
  }

  // Abrir para EDITAR
  abrirModalEditar(u: Usuario) {
    this.esEdicion = true;
    this.usuarioActual = { ...u }; // Copiamos los datos para no editarlos en la lista directamente
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  // --- LÓGICA DE GUARDADO (Unificada) ---
  guardarUsuario() {
    if (this.esEdicion) {
      // EDITAR
      this.usuariosService.updateUsuario(this.usuarioActual.IdUsuario!, this.usuarioActual).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarUsuarios(); // Refrescar la lista
        },
        error: (e) => console.error(e)
      });
    } else {
      // CREAR
      this.usuariosService.createUsuario(this.usuarioActual).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarUsuarios();
        },
        error: (e) => console.error(e)
      });
    }
  }

  borrarUsuario(id: number) {
    if(!confirm('¿Borrar usuario?')) return;
    this.usuariosService.deleteUsuario(id).subscribe(() => this.cargarUsuarios());
  }
}