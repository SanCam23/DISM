import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FichajesService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) { }

  getFichajeActual(usuarioId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/fichajes/actual/${usuarioId}`);
  }

  createFichaje(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/fichajes`, data);
  }

  finalizarFichaje(idFichaje: number): Observable<any> {
    return this.http.put(`${this.apiUrl}/fichajes/${idFichaje}/finalizar`, {});
  }

  getFichajesByUsuario(usuarioId: number, fechaInicio?: string, fechaFin?: string): Observable<any> {
    let params: any = { usuarioId };

    if (fechaInicio) {
      params.fechaInicio = fechaInicio;
    }

    if (fechaFin) {
      params.fechaFin = fechaFin;
    }

    return this.http.get(`${this.apiUrl}/fichajes/usuario`, { params });
  }

}
