import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, 
  IonLabel, IonButton, IonIcon, IonButtons, IonBackButton,
  IonModal, IonInput
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
    IonModal, IonInput
  ]
})
export class GestionUsuariosPage implements OnInit {
  
  isModalOpen = false;

  usuarios: Usuario[] = [];

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

  // Abrir modal para crear nuevo usuario
  abrirModalCrear() {
    this.esEdicion = false;
    this.usuarioActual = { Nombre: '', Usuario: '', Clave: '' };
    this.isModalOpen = true;
  }

  // Abrir modal para editar usuario existente
  abrirModalEditar(u: Usuario) {
    this.esEdicion = true;
    this.usuarioActual = { ...u };
    this.isModalOpen = true;
  }

  cerrarModal() {
    this.isModalOpen = false;
  }

  // Guardar usuario (crear o actualizar según contexto)
  guardarUsuario() {
    if (this.esEdicion) {
      // Actualizar usuario existente
      this.usuariosService.updateUsuario(this.usuarioActual.IdUsuario!, this.usuarioActual).subscribe({
        next: () => {
          this.cerrarModal();
          this.cargarUsuarios();
        },
        error: (e) => console.error(e)
      });
    } else {
      // Crear nuevo usuario
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