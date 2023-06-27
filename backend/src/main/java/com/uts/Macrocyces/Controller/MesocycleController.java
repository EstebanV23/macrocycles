package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Mesocycle;
import com.uts.Macrocyces.Repository.MesocycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/mesocycle")
@CrossOrigin(origins = "*")
public class MesocycleController {

    @Autowired
    private MesocycleRepository mesocycleRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllMesocycles() {
        try {
            List<Mesocycle> mesocycles = mesocycleRepository.findAll();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", mesocycles);
            response.put("type", "success");
            response.put("message", "Lista de mesociclos encontrada");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de mesociclos");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMesocycleById(@PathVariable("id") String id) {
        try {
            Optional<Mesocycle> mesocycleOptional = mesocycleRepository.findById(id);
            if (mesocycleOptional.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Mesociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Mesocycle mesocycle = mesocycleOptional.get();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", mesocycle);
            response.put("type", "success");
            response.put("message", "Mesociclo encontrado exitosamente");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar el mesociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> addMesocycle(@RequestBody Mesocycle mesocycle) {
        try {
            Mesocycle savedMesocycle = mesocycleRepository.save(mesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedMesocycle);
            response.put("type", "success");
            response.put("message", "Mesociclo añadido exitosamente");
            response.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al añadir el mesociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMesocycle(@PathVariable("id") String id, @RequestBody Mesocycle updatedMesocycle) {
        try {
            Optional<Mesocycle> mesocycleOptional = mesocycleRepository.findById(id);
            if (mesocycleOptional.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Mesociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Mesocycle mesocycle = mesocycleOptional.get();
            mesocycle.setType(updatedMesocycle.getType());
            mesocycle.setStartDate(updatedMesocycle.getStartDate());
            mesocycle.setEndDate(updatedMesocycle.getEndDate());
            mesocycle.setMicrocycles(updatedMesocycle.getMicrocycles());

            updatedMesocycle = mesocycleRepository.save(mesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", updatedMesocycle);
            response.put("type", "success");
            response.put("message", "Mesociclo actualizado exitosamente");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el mesociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateMesocycle(@PathVariable String id, @RequestBody Mesocycle updatedMesocycle) {
        try {
            Optional<Mesocycle> optionalMesocycle = mesocycleRepository.findById(id);
            if (optionalMesocycle.isPresent()) {
                Mesocycle mesocycle = optionalMesocycle.get();

                // Verificar si se proporciona un tipo actualizado en el cuerpo de la solicitud
                if (updatedMesocycle.getType() != null) {
                    mesocycle.setType(updatedMesocycle.getType());
                }

                // Verificar si se proporciona una fecha de inicio actualizada en el cuerpo de la solicitud
                if (updatedMesocycle.getStartDate() != null) {
                    mesocycle.setStartDate(updatedMesocycle.getStartDate());
                }

                // Verificar si se proporciona una fecha de finalización actualizada en el cuerpo de la solicitud
                if (updatedMesocycle.getEndDate() != null) {
                    mesocycle.setEndDate(updatedMesocycle.getEndDate());
                }

                // Verificar si se proporciona una lista de microciclos actualizada en el cuerpo de la solicitud
                if (updatedMesocycle.getMicrocycles() != null) {
                    mesocycle.setMicrocycles(updatedMesocycle.getMicrocycles());
                }

                Mesocycle savedMesocycle = mesocycleRepository.save(mesocycle);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedMesocycle);
                response.put("type", "success");
                response.put("message", "Mesociclo actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Mesociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el Mesociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMesocycle(@PathVariable("id") String id) {
        try {
            Optional<Mesocycle> mesocycleOptional = mesocycleRepository.findById(id);
            if (mesocycleOptional.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Mesociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            mesocycleRepository.deleteById(id);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "success");
            response.put("message", "Mesociclo eliminado exitosamente");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar el mesociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



}
