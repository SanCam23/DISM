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
  // Asegúrate de que el puerto coincida con tu backend (8080)
  private apiUrl = 'http://localhost:8080/trabajos'; 

  constructor(private http: HttpClient) {}

  getTrabajos(): Observable<Trabajo[]> {
    return this.http.get<Trabajo[]>(this.apiUrl);
  }

  createTrabajo(trabajo: Trabajo): Observable<any> {
    return this.http.post(this.apiUrl, trabajo);
  }

  updateTrabajo(id: number, trabajo: Trabajo): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, trabajo);
  }

  deleteTrabajo(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}