import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Usuario {
  IdUsuario?: number;
  Nombre: string;
  Usuario: string;
  Clave?: string; 
}

export interface LoginResponse {
  usuario: Usuario;
  message: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:8080/usuarios';

  constructor(private http: HttpClient) {}

  // Obtener listado completo de usuarios
  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Autenticar usuario
  login(usuario: string, clave: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, { Usuario: usuario, Clave: clave });
  }
}