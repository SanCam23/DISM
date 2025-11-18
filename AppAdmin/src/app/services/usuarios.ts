import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  IdUsuario?: number;
  Nombre: string;
  Usuario: string;
  Clave: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  // Ajusta el puerto si tu servidor corre en otro (ej: 8080)
  private apiUrl = 'http://localhost:8080/usuarios'; 

  constructor(private http: HttpClient) {}

  // 1. Obtener todos (GET)
  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  // 2. Obtener uno por ID (GET)
  getUsuario(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  // 3. Crear nuevo (POST)
  createUsuario(usuario: Usuario): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

  // 4. Actualizar existente (PUT)
  updateUsuario(id: number, usuario: Usuario): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  // 5. Borrar (DELETE)
  deleteUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}