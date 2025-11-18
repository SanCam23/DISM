import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TrabajosService {
  private apiUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getTrabajos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/trabajos`);
  }
}
