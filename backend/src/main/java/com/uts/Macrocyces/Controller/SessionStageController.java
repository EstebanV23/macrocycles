package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.SessionStage;
import com.uts.Macrocyces.Repository.ExerciseRepository;
import com.uts.Macrocyces.Repository.SessionStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/session-stage")
@CrossOrigin(origins = "*")
public class SessionStageController {

    @Autowired
    private SessionStageRepository sessionStageRepository;

    @Autowired
    private ExerciseRepository exerciseRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllSessionStages() {
        try {
            List<SessionStage> sessionStages = sessionStageRepository.findAll();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", sessionStages);
            response.put("type", "success");
            response.put("message", "Lista de las etapas de sesiones encontrada");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de las etapas de sesiones");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getSessionStageById(@PathVariable String id) {
        try {
            Optional<SessionStage> optionalSessionStage = sessionStageRepository.findById(id);
            if (optionalSessionStage.isPresent()) {
                SessionStage sessionStage = optionalSessionStage.get();

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", sessionStage);
                response.put("type", "success");
                response.put("message", "Etapa de sesion encontrada exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Etapa de sesion no encontrada");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la etapa de sesion");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> createSessionStage(@RequestBody SessionStage sessionStage) {
        try {
            SessionStage createdSessionStage = sessionStageRepository.save(sessionStage);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", createdSessionStage);
            response.put("type", "success");
            response.put("message", "Etapa de sesion creada exitosamente");
            response.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al crear la etapa de sesion");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSessionStage(@PathVariable String id, @RequestBody SessionStage updatedSessionStage) {
        try {
            Optional<SessionStage> optionalSessionStage = sessionStageRepository.findById(id);
            if (optionalSessionStage.isPresent()) {
                SessionStage sessionStage = optionalSessionStage.get();
                sessionStage.setName(updatedSessionStage.getName());
                sessionStage.setExercises(updatedSessionStage.getExercises());
                SessionStage savedSessionStage = sessionStageRepository.save(sessionStage);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedSessionStage);
                response.put("type", "success");
                response.put("message", "SessionStage actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "SessionStage no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el SessionStage");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSessionStage(@PathVariable String id) {
        try {
            Optional<SessionStage> optionalSessionStage = sessionStageRepository.findById(id);
            if (optionalSessionStage.isPresent()) {
                SessionStage sessionStage = optionalSessionStage.get();
                sessionStageRepository.delete(sessionStage);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "success");
                response.put("message", "Etapa de sesion eliminada exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Etapa de sesion no encontrada");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar el SessionStage");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}