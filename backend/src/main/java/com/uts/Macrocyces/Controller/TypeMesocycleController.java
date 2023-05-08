package com.uts.Macrocyces.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uts.Macrocyces.Entity.Mesocycle;
import com.uts.Macrocyces.Entity.TypeMesocycle;
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
@RequestMapping("/api/typemesocycles")
@CrossOrigin(origins = "*")
public class TypeMesocycleController {

    @Autowired
    private TypeMesocycleRepository typeMesocycleRepository;

    @Autowired
    private MesocycleRepository mesocycleRepository;



    @GetMapping("/name/{typeMesocycleName}")
    public ResponseEntity<Object> getTypeMesocycle(@PathVariable String typeMesocycleName) {
        try {
            TypeMesocycle typeMesocycle = typeMesocycleRepository.findByName(typeMesocycleName)
                    .orElseThrow(() -> new ResourceNotFoundException("TypeMesocycle not found for name: " + typeMesocycleName));
            List<Mesocycle> mesocycles = mesocycleRepository.findByTypeMesocycle(typeMesocycle);

            if (mesocycles == null) {
                typeMesocycle.setMesocycles(null);
            } else {
                typeMesocycle.setMesocycles(mesocycles);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", typeMesocycle);
            response.put("type", "success");
            response.put("message", "TypeMesocycle encontrado");
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
            response.put("message", "Error al buscar TypeMesocycle");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/types")
    public ResponseEntity<Object> getAllTypeMesocycles() {
        try {
            List<TypeMesocycle> allTypeMesocycles = typeMesocycleRepository.findAll();
            for (TypeMesocycle typeMesocycle : allTypeMesocycles) {
                List<Mesocycle> mesocycles = mesocycleRepository.findByTypeMesocycle(typeMesocycle);
                typeMesocycle.setMesocycles(mesocycles);
            }
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", allTypeMesocycles);
            response.put("type", "success");
            response.put("message", "Lista de tipos de mesociclos encontrada");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de tipos de mesociclos");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getTypeMesocycleById(@PathVariable(value = "id") String typeMesocycleId) {
        try {
            TypeMesocycle typeMesocycle = typeMesocycleRepository.findById(typeMesocycleId)
                    .orElseThrow(() -> new ResourceNotFoundException("TypeMicrocycle not found for this id :: " + typeMesocycleId));

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", typeMesocycle);
            response.put("type", "success");
            response.put("message", "Tipo de mesociclo encontrado");
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
            response.put("message", "Error al buscar el tipo de mesociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> createTypeMesocycles(@RequestBody Map<String, Object> body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            TypeMesocycle typeMesocycle = mapper.convertValue(body, TypeMesocycle.class);
            TypeMesocycle createdTypeMesocycle = typeMesocycleRepository.save(typeMesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", createdTypeMesocycle);
            response.put("type", "success");
            response.put("message", "TypeMesocycle created successfully");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Failed to create TypeMesocycle");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTypeMesocycles(@PathVariable(value = "id") String typeMesocycleId, @RequestBody Map<String, Object> body) {
        try {
            TypeMesocycle typeMesocycle = typeMesocycleRepository.findById(typeMesocycleId)
                    .orElseThrow(() -> new ResourceNotFoundException("TypeMesocycle not found for this id :: " + typeMesocycleId));

            ObjectMapper mapper = new ObjectMapper();
            TypeMesocycle updatedTypeMesocycle = mapper.convertValue(body, TypeMesocycle.class);
            updatedTypeMesocycle.setId(typeMesocycle.getId());

            final TypeMesocycle savedTypeMesocycle = typeMesocycleRepository.save(updatedTypeMesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedTypeMesocycle);
            response.put("type", "success");
            response.put("message", "TypeMesocycle updated successfully");
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

    public ResponseEntity<Map<String, Object>> deleteTypeMesocycles(@PathVariable(value = "id") String typeMicrocycleId) {
        try {
            TypeMesocycle typeMesocycle = typeMesocycleRepository.findById(typeMicrocycleId)
                    .orElseThrow(() -> new ResourceNotFoundException("TypeMicrocycle not found for this id :: " + typeMicrocycleId));

            typeMesocycleRepository.delete(typeMesocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "success");
            response.put("message", "TypeMesocycle deleted successfully");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());
            response.put("data", null);

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResourceNotFoundException ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("statusCode", HttpStatus.NOT_FOUND.value());
            response.put("data", null);

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "An error occurred while deleting the TypeMesocycle");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());
            response.put("data", null);

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




}


