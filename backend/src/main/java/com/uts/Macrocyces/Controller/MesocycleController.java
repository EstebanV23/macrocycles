package com.uts.Macrocyces.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uts.Macrocyces.Entity.Mesocycle;
import com.uts.Macrocyces.Entity.TypeMesocycle;
import com.uts.Macrocyces.Exceptions.ErrorResponseModel;
import com.uts.Macrocyces.Exceptions.ResourceNotFoundException;
import com.uts.Macrocyces.Repository.MesocycleRepository;
import com.uts.Macrocyces.Repository.TypeMesocycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/mesocycles")
@CrossOrigin(origins = "*")

public class MesocycleController {


    @Autowired
    private MesocycleRepository mesocycleRepository;

    @Autowired
    private TypeMesocycleRepository typeMesocycleRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllMesocycles() {
        try {
            List<Mesocycle> mesocycles = mesocycleRepository.findAll();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", mesocycles);
            response.put("type", "success");
            response.put("message", "Lista de mesociclos encontrada");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de mesociclos");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMesocycleById(@PathVariable(value = "id") String mesocycleId) {
        try {
            Mesocycle mesocycle = mesocycleRepository.findById(mesocycleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Mesocycle not found for this id :: " + mesocycleId));

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", mesocycle);
            response.put("type", "success");
            response.put("message", "Mesociclo encontrado");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResourceNotFoundException ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error " + mesocycleId);
            response.put("message", "El mesociclo no se encuentra en la base de datos por favor verifique la informacion: " + mesocycleId);
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("statusCode", HttpStatus.NOT_FOUND.value());

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @PostMapping("")
    public ResponseEntity<Object> createMesocycle(@RequestBody Map<String, Object> body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Mesocycle mesocycle = mapper.convertValue(body, Mesocycle.class);
            String typeMesocycleName = (String) body.get("typeMesocycle");
            TypeMesocycle typeMesocycle = typeMesocycleRepository.findByName(typeMesocycleName)
                    .orElseThrow(() -> new ResourceNotFoundException("El TypeMesocycle no se encuentra con ese nombre : " + typeMesocycleName));
            mesocycle.setTypeMicrocycle(typeMesocycle);
            mesocycleRepository.save(mesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", mesocycle);
            response.put("type", "success");
            response.put("message", "Mesociclo creado exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResourceNotFoundException ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("statusCode", HttpStatus.NOT_FOUND.value());

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMesocycle(@PathVariable(value = "id") String mesocycleId, @RequestBody Map<String, Object> body) {
        try {
            Mesocycle mesocycle = mesocycleRepository.findById(mesocycleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Mesocycle not found for this id :: " + mesocycleId));

            ObjectMapper mapper = new ObjectMapper();
            Mesocycle updatedMesocycle = mapper.convertValue(body, Mesocycle.class);
            updatedMesocycle.setId(mesocycle.getId());
            String typeMesocycleName = (String) body.get("typeMicrocycle");
            TypeMesocycle typeMesocycle = typeMesocycleRepository.findByName(typeMesocycleName)
                    .orElseThrow(() -> new ResourceNotFoundException("TypeMesocycle not found for this name :: " + typeMesocycleName));

            updatedMesocycle.setTypeMicrocycle(typeMesocycle);
            final Mesocycle savedMesocycle = mesocycleRepository.save(updatedMesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedMesocycle);
            response.put("type", "success");
            response.put("message", "Mesociclo actualizado exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResourceNotFoundException ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("statusCode", HttpStatus.NOT_FOUND.value());

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, Object>> deleteMesocycle(@PathVariable(value = "id") String mesocycleId) {
        try {
            Mesocycle mesocycle = mesocycleRepository.findById(mesocycleId)
                    .orElseThrow(() -> new ResourceNotFoundException("Mesocycle not found for this id :: " + mesocycleId));

            mesocycleRepository.delete(mesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "Mesociclo eliminado exitosamente");
            response.put("type", "success");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResourceNotFoundException ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("statusCode", HttpStatus.NOT_FOUND.value());

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "No se pudo eliminar el Mesociclo con id: " + mesocycleId);
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}






