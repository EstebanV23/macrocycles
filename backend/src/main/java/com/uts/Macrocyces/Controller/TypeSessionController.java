package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.StageSession;
import com.uts.Macrocyces.Entity.TypeSession;
import com.uts.Macrocyces.Repository.TypeSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/type-session")
@CrossOrigin(origins = "*")
public class TypeSessionController {

    @Autowired
    private TypeSessionRepository typeSessionRepository;

/*
    @GetMapping("/")
    public ResponseEntity<Object> getAllTypeSessions() {

            List<TypeSession> typeSessions = typeSessionRepository.findAll();
            List<TypeSession> allTypeSession = new ArrayList<>();
            for (TypeSession typeSession : typeSessions){
                List<StageSession> stageSessions = (List<StageSession>) typeSession.getStageSession();
                List<StageSession> stages = new ArrayList<>();
                for (StageSession stageSession : stageSessions){
                    stageSession.setTypeSessions(null);
                    stageSession.setExercises(null);
                    stages.add(stageSession);
                }
                typeSession

            }


    }*/


    @PostMapping("")
    public ResponseEntity<Object> addTypeSession(@RequestBody TypeSession typeSession) {
        try {

            TypeSession savedTypeSession = typeSessionRepository.save(typeSession);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedTypeSession);
            response.put("type", "success");
            response.put("message", "TypeSession agregado correctamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al agregar el TypeSession");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
