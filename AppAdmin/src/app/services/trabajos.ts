import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Trabajo {
  IdTrabajo?: number;
  Nombre: string;
}

@Injectable({
  providedIn: 'root'
})
export class TrabajosService {
  private apiUrl = 'http://localhost:8080/trabajos'; 

  constructor(private http: HttpClient) {}

  // Obtener listado completo de trabajos
  getTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrl);
  }

  // Crear nuevo trabajo
  createTrabajo(trabajo: Trabajo): Observable<any> {
    return this.http.post(this.apiUrl, trabajo);
  }

  // Actualizar trabajo existente
  updateTrabajo(id: number, trabajo: Trabajo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, trabajo);
  }

  // Eliminar trabajo
  deleteTrabajo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}