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
  // Añade otros campos si los necesitas
}

@Injectable({
  providedIn: 'root'
})
export class FichajesService {
  private apiUrl = 'http://localhost:8080/fichajes'; 

  constructor(private http: HttpClient) {}

  // 1. Obtener TODOS los fichajes (sin filtros)
  getFichajes(): Observable<Fichaje[]> {
    return this.http.get<Fichaje[]>(this.apiUrl);
  }

  // 2. Filtrar por Usuario y Fechas
  // Backend espera: /fichajes/usuario?usuarioId=X&fechaInicio=Y&fechaFin=Z
  getFichajesFiltrados(usuarioId: number, fechaInicio?: string, fechaFin?: string): Observable<Fichaje[]> {
    let params = new HttpParams().set('usuarioId', usuarioId);
    
    if (fechaInicio) params = params.set('fechaInicio', fechaInicio);
    if (fechaFin) params = params.set('fechaFin', fechaFin);

    return this.http.get<Fichaje[]>(`${this.apiUrl}/usuario`, { params });
  }
}