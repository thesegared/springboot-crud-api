import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PersonaService } from './services/persona.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html'
})
export class AppComponent {

  busqueda: string = '';
  personas: any[] = [];
  personasFiltradas: any[] = [];


  nuevaPersona = {
    nombre: '',
    email: ''
  };

  constructor(private personaService: PersonaService) {
    this.cargarPersonas();
  }

  cargarPersonas() {
    this.personaService.obtenerPersonas().subscribe(data => {
      this.personas = data as any[];
      this.personasFiltradas = this.personas;
    });
  }

  buscar() {
    this.personasFiltradas = this.personas.filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase()) ||
      p.email.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  agregarPersona() {
    //console.log("CLICK AGREGAR", this.nuevaPersona);
    this.personaService.crearPersona(this.nuevaPersona)
      .subscribe(() => {
        this.cargarPersonas();
        this.nuevaPersona = { nombre: '', email: '' };
      });
  }

  eliminarPersona(id: number) {
    this.personaService.eliminarPersona(id)
      .subscribe(() => {
        this.cargarPersonas();
      });
  }

  editando: boolean = false;
  personaEditandoId: number | null = null;

  editarPersona(persona: any) {
    this.nuevaPersona = { ...persona };
    this.editando = true;
    this.personaEditandoId = persona.id;
  }

  actualizarPersona() {

    if (this.personaEditandoId != null) {

      this.personaService.actualizarPersona(this.personaEditandoId, this.nuevaPersona)
        .subscribe(() => {
          this.cargarPersonas();
          this.nuevaPersona = { nombre: '', email: '' };
          this.editando = false;
        });

    }

  }
}