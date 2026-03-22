package com.example.personasapi.controller;

import com.example.personasapi.entity.Persona;
import com.example.personasapi.repository.PersonaRepository;
import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/personas")
@CrossOrigin(origins = "http://localhost:4200")
public class PersonaController {

    private final PersonaRepository personaRepository;

    public PersonaController(PersonaRepository personaRepository){
        this.personaRepository = personaRepository;
    }

    @GetMapping
    public List<Persona> listarPersonas() {
        return personaRepository.findAll();
    }

    @PostMapping
    public Persona crearPersona(@Valid @RequestBody Persona persona) {
        return personaRepository.save(persona);
    }

    @GetMapping("/{id}")
    public Persona obtenerPersonaPorId(@PathVariable Long id) {
        return personaRepository.findById(id).orElse(null);
    }

    @PutMapping("/{id}")
    public Persona actualizarPersona(@PathVariable Long id, @RequestBody Persona personaActualizada){

        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Persona no encontrada"));

        persona.setNombre(personaActualizada.getNombre());
        persona.setEmail(personaActualizada.getEmail());

        return personaRepository.save(persona);
    }

    @DeleteMapping("/{id}")
    public void eliminarPersona(@PathVariable Long id) {
        personaRepository.deleteById(id);
    }

    @Operation(summary = "Buscar persona por email")
    @GetMapping("/buscar")
    public Persona buscarPorEmail(@RequestParam String email){
        return personaRepository.findByEmail(email).orElse(null);
    }
}
