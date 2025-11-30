import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Fichaje {
  IdFichaje: number;
  FechaHoraEntrada: string;
  FechaHoraSalida?: string;
  UsuarioNombre?: string;
  TrabajoNombre?: string;
  GeolocalizacionLatitud?: number;
  GeolocalizacionLongitud?: number;
}

@Injectable({
  providedIn: 'root'
})
export class FichajesService {
  private apiUrl = 'http://localhost:8080/fichajes'; 

  constructor(private http: HttpClient) {}

  // Obtener todos los fichajes sin filtros
  getFichajes(): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(this.apiUrl);
  }

  // Obtener fichajes filtrados por usuario y rango de fechas
  getFichajesFiltrados(usuarioId: number, fechaInicio?: string, fechaFin?: string): Observable<Fichaje[]> {
    let params = new HttpParams().set('usuarioId', usuarioId);
    
    if (fechaInicio) params = params.set('fechaInicio', fechaInicio);
    if (fechaFin) params = params.set('fechaFin', fechaFin);

    return this.http.get<Fichaje[]>(`${this.apiUrl}/usuario`, { params });
  }
}