import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private apiUrl = 'http://localhost:8080/personas';

  constructor(private http: HttpClient) { }

  obtenerPersonas() {
    return this.http.get(this.apiUrl);
  }

  crearPersona(persona: any) {
    return this.http.post(this.apiUrl, persona);
  }

  eliminarPersona(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  actualizarPersona(id: number, persona: any) {
    return this.http.put(`${this.apiUrl}/${id}`, persona);
  }

}
