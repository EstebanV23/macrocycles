package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Macrocycle;
import com.uts.Macrocyces.Repository.MacrocycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/macrocycle")
@CrossOrigin(origins = "*")
public class MacrocycleController {

    @Autowired
    private MacrocycleRepository macrocycleRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllMacrocycles() {
        try {
            List<Macrocycle> macrocycles = macrocycleRepository.findAll();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", macrocycles);
            response.put("type", "success");
            response.put("message", "Lista de macrociclos encontrada");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de macrociclos");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getMacrocycleById(@PathVariable("id") String id) {
        try {
            Optional<Macrocycle> macrocycleOptional = macrocycleRepository.findById(id);
            if (macrocycleOptional.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Macrociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Macrocycle macrocycle = macrocycleOptional.get();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", macrocycle);
            response.put("type", "success");
            response.put("message", "Macrociclo encontrado");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar el macrociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> addMacrocycle(@RequestBody Macrocycle macrocycle) {
        try {
            Macrocycle newMacrocycle = macrocycleRepository.save(macrocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", newMacrocycle);
            response.put("type", "success");
            response.put("message", "Macrociclo añadido exitosamente");
            response.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al añadir el macrociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateMacrocycle(@PathVariable("id") String id, @RequestBody Macrocycle updatedMacrocycle) {
        try {
            Optional<Macrocycle> macrocycleOptional = macrocycleRepository.findById(id);
            if (macrocycleOptional.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Macrociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Macrocycle existingMacrocycle = macrocycleOptional.get();
            existingMacrocycle.setName(updatedMacrocycle.getName());
            existingMacrocycle.setStart_date(updatedMacrocycle.getStart_date());
            existingMacrocycle.setEnd_date(updatedMacrocycle.getEnd_date());
            existingMacrocycle.setTime_frame(updatedMacrocycle.getTime_frame());
            existingMacrocycle.setStages(updatedMacrocycle.getStages());
            existingMacrocycle.setMesocycles(updatedMacrocycle.getMesocycles());

            Macrocycle updatedMacrocycleEntity = macrocycleRepository.save(existingMacrocycle);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", updatedMacrocycleEntity);
            response.put("type", "success");
            response.put("message", "Macrociclo actualizado exitosamente");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el macrociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteMacrocycle(@PathVariable("id") String id) {
        try {
            Optional<Macrocycle> macrocycleOptional = macrocycleRepository.findById(id);
            if (macrocycleOptional.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Macrociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }

            Macrocycle macrocycleToDelete = macrocycleOptional.get();
            macrocycleRepository.delete(macrocycleToDelete);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "success");
            response.put("message", "Macrociclo eliminado exitosamente");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar el macrociclo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


}
