package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.StageSession;
import com.uts.Macrocyces.Entity.TypeSession;
import com.uts.Macrocyces.Repository.StageSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stage-session")
@CrossOrigin(origins = "*")
public class StageSessionController {

    @Autowired
    private StageSessionRepository stageSessionRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllStageSessions() {
        try {
            List<StageSession> stageSessions = stageSessionRepository.findAll();
            for (StageSession stageSession : stageSessions) {
                List<TypeSession> typeSessions = stageSession.getTypeSessions();
                for (TypeSession typeSession : typeSessions) {
                    typeSession.setStageSession(null);
                }
                stageSession.setExercises(null);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", stageSessions);
            response.put("type", "success");
            response.put("message", "Lista de StageSession encontrada");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de StageSession");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> addStageSession(@RequestBody StageSession stageSession) {
        try {
            // Establecer los campos stageSession y exercises en null para evitar bucles infinitos
            List<TypeSession> typeSessions = stageSession.getTypeSessions();
            for (TypeSession typeSession : typeSessions) {
                typeSession.setStageSession(null);
            }
            stageSession.setExercises(null);

            StageSession savedStageSession = stageSessionRepository.save(stageSession);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedStageSession);
            response.put("type", "success");
            response.put("message", "StageSession añadido exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al añadir StageSession");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




}
