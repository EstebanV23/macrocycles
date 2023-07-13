package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Macrocycle;
import com.uts.Macrocyces.Repository.MacrocycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;

@RestController
@RequestMapping("/api/macrocycle")
@CrossOrigin(origins = "*")
public class MacrocycleController {

    @Autowired
    private MacrocycleRepository macrocycleRepository;

    @GetMapping("/type/{type}")
    public List<Macrocycle> getMacrocyclesByType(@PathVariable int type) {
        return macrocycleRepository.findByType(type);
    }

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

    @GetMapping("/components/{id}")
    public ResponseEntity<Object> getMacrocycleByIdComponents(@PathVariable("id") String id) {
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
            List<Macrocycle.Component> components = List.of(macrocycle.getComponents());

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", components);
            response.put("type", "success");
            response.put("message", "Componentes del macrociclo encontrado");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Componentes del macrociclo no encontrados");
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
    public ResponseEntity<Object> createMacrocycle(@RequestBody Macrocycle macrocycleRequest) {
        try {
            Macrocycle macrocycle = new Macrocycle();
            macrocycle.setName(macrocycleRequest.getName());
            macrocycle.setStart_date(macrocycleRequest.getStart_date());
            macrocycle.setEnd_date(macrocycleRequest.getEnd_date());
            macrocycle.setType(macrocycleRequest.getType());

            // Create components
            List<Macrocycle.Component> components = new ArrayList<>();
            for (Macrocycle.Component componentRequest : macrocycleRequest.getComponents()) {
                Macrocycle.Component component = new Macrocycle.Component();
                component.setAmount(componentRequest.getAmount());
                component.setType(componentRequest.getType());
                component.setUnitMeasure(componentRequest.getUnitMeasure());

                // Create mesocycles
                List<Macrocycle.Component.Mesocycles> mesocycles = new ArrayList<>();
                for (Macrocycle.Component.Mesocycles mesocycleRequest : componentRequest.getMesocycles()) {
                    Macrocycle.Component.Mesocycles mesocycle = new Macrocycle.Component.Mesocycles();
                    mesocycle.setType(mesocycleRequest.getType());
                    mesocycle.setPercent(mesocycleRequest.getPercent());
                    mesocycle.setAmount(mesocycleRequest.getAmount());

                    // Create microcycles
                    List<Macrocycle.Component.Mesocycles.Microcycles> microcycles = new ArrayList<>();
                    for (Macrocycle.Component.Mesocycles.Microcycles microcycleRequest : mesocycleRequest.getMicrocycles()) {
                        Macrocycle.Component.Mesocycles.Microcycles microcycle = new Macrocycle.Component.Mesocycles.Microcycles();
                        microcycle.setType(microcycleRequest.getType());
                        microcycle.setPercent(microcycleRequest.getPercent());
                        microcycle.setAmount(microcycleRequest.getAmount());

                        microcycles.add(microcycle);
                    }
                    mesocycle.setMicrocycles(microcycles);

                    mesocycles.add(mesocycle);
                }
                component.setMesocycles(mesocycles);

                components.add(component);
            }
            macrocycle.setComponents(components);

            macrocycle.setTime_frame(macrocycleRequest.getTime_frame());
            macrocycle.setStages(macrocycleRequest.getStages());
            macrocycle.setMesocycles(macrocycleRequest.getMesocycles());

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




    /*
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
    */


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

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateMacrocycle(@PathVariable String id, @RequestBody Macrocycle updatedMacrocycle) {
        try {
            Optional<Macrocycle> optionalMacrocycle = macrocycleRepository.findById(id);
            if (optionalMacrocycle.isPresent()) {
                Macrocycle macrocycle = optionalMacrocycle.get();

                // Verificar si se proporciona un nombre actualizado en el cuerpo de la solicitud
                if (updatedMacrocycle.getName() != null) {
                    macrocycle.setName(updatedMacrocycle.getName());
                }

                // Verificar si se proporciona una fecha de inicio actualizada en el cuerpo de la solicitud
                if (updatedMacrocycle.getStart_date() != null) {
                    macrocycle.setStart_date(updatedMacrocycle.getStart_date());
                }

                // Verificar si se proporciona una fecha de finalización actualizada en el cuerpo de la solicitud
                if (updatedMacrocycle.getEnd_date() != null) {
                    macrocycle.setEnd_date(updatedMacrocycle.getEnd_date());
                }

                if(updatedMacrocycle.getType() != 0){
                    macrocycle.setType(updatedMacrocycle.getType());
                }

                if(updatedMacrocycle.getComponents() != null){
                    macrocycle.setComponents(List.of(updatedMacrocycle.getComponents()));
                }

                // Verificar si se proporciona una lista de marcos de tiempo actualizada en el cuerpo de la solicitud
                if (updatedMacrocycle.getTime_frame() != null) {
                    macrocycle.setTime_frame(updatedMacrocycle.getTime_frame());
                }

                // Verificar si se proporciona una lista de etapas actualizada en el cuerpo de la solicitud
                if (updatedMacrocycle.getStages() != null) {
                    macrocycle.setStages(updatedMacrocycle.getStages());
                }

                // Verificar si se proporciona una lista de mesociclos actualizada en el cuerpo de la solicitud
                if (updatedMacrocycle.getMesocycles() != null) {
                    macrocycle.setMesocycles(updatedMacrocycle.getMesocycles());
                }

                Macrocycle savedMacrocycle = macrocycleRepository.save(macrocycle);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedMacrocycle);
                response.put("type", "success");
                response.put("message", "Macrociclo actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Macrociclo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el Macrociclo");
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
    @DeleteMapping("/")
    public ResponseEntity<Object> deleteAllMesocycles() {
        try {
            macrocycleRepository.deleteAll(); // Elimina todos los elementos de la colección

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "success");
            response.put("message", "Todos los mesociclos han sido eliminados exitosamente");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar los mesociclos");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
