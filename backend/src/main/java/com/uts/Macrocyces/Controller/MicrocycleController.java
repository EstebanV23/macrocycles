package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Microcycle;
import com.uts.Macrocyces.Repository.MicrocycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/microcycle")
@CrossOrigin(origins = "*")
public class MicrocycleController {

    @Autowired
    private MicrocycleRepository microcycleRepository;


    @GetMapping("/")
    public ResponseEntity<Object> getAllMicrocycles() {
        try {
            List<Microcycle> microcycles = microcycleRepository.findAll();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", microcycles);
            response.put("type", "success");
            response.put("message", "Lista de microciclos encontrada");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de microciclos");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMicrocycleById(@PathVariable String id) {
        try {
            Optional<Microcycle> microcycle = microcycleRepository.findById(id);
            if (microcycle.isPresent()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", microcycle.get());
                response.put("type", "success");
                response.put("message", "Microciclo encontrado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Microciclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar el microciclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> addMicrocycle(@RequestBody Microcycle microcycle) {
        try {
            Microcycle savedMicrocycle = microcycleRepository.save(microcycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedMicrocycle);
            response.put("type", "success");
            response.put("message", "Microciclo añadido exitosamente");
            response.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al añadir el microciclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMicrocycle(@PathVariable String id, @RequestBody Microcycle microcycle) {
        try {
            Optional<Microcycle> existingMicrocycle = microcycleRepository.findById(id);
            if (existingMicrocycle.isPresent()) {
                Microcycle updatedMicrocycle = existingMicrocycle.get();
                updatedMicrocycle.setType(microcycle.getType());
                updatedMicrocycle.setStartDate(microcycle.getStartDate());
                updatedMicrocycle.setEndDate(microcycle.getEndDate());
                updatedMicrocycle.setFrequency(microcycle.getFrequency());
                updatedMicrocycle.setTest(microcycle.getTest());
                updatedMicrocycle.setSessions(microcycle.getSessions());

                Microcycle savedMicrocycle = microcycleRepository.save(updatedMicrocycle);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedMicrocycle);
                response.put("type", "success");
                response.put("message", "Microciclo actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Microciclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el microciclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateMicrocycle(@PathVariable String id, @RequestBody Microcycle updatedMicrocycle) {
        try {
            Optional<Microcycle> optionalMicrocycle = microcycleRepository.findById(id);
            if (optionalMicrocycle.isPresent()) {
                Microcycle microcycle = optionalMicrocycle.get();

                // Verificar si se proporciona un tipo actualizado en el cuerpo de la solicitud
                if (updatedMicrocycle.getType() != null) {
                    microcycle.setType(updatedMicrocycle.getType());
                }

                // Verificar si se proporciona una fecha de inicio actualizada en el cuerpo de la solicitud
                if (updatedMicrocycle.getStartDate() != null) {
                    microcycle.setStartDate(updatedMicrocycle.getStartDate());
                }

                // Verificar si se proporciona una fecha de finalización actualizada en el cuerpo de la solicitud
                if (updatedMicrocycle.getEndDate() != null) {
                    microcycle.setEndDate(updatedMicrocycle.getEndDate());
                }

                // Verificar si se proporciona una frecuencia actualizada en el cuerpo de la solicitud
                if (updatedMicrocycle.getFrequency() != 0) {
                    microcycle.setFrequency(updatedMicrocycle.getFrequency());
                }

                // Verificar si se proporciona una prueba actualizada en el cuerpo de la solicitud
                if (updatedMicrocycle.getTest() != null) {
                    microcycle.setTest(updatedMicrocycle.getTest());
                }

                // Verificar si se proporciona una lista de sesiones actualizada en el cuerpo de la solicitud
                if (updatedMicrocycle.getSessions() != null) {
                    microcycle.setSessions(updatedMicrocycle.getSessions());
                }

                Microcycle savedMicrocycle = microcycleRepository.save(microcycle);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedMicrocycle);
                response.put("type", "success");
                response.put("message", "Microciclo actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Microciclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el Microciclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMicrocycle(@PathVariable String id) {
        try {
            Optional<Microcycle> microcycle = microcycleRepository.findById(id);
            if (microcycle.isPresent()) {
                microcycleRepository.deleteById(id);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "success");
                response.put("message", "Microciclo eliminado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Microciclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar el microciclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
