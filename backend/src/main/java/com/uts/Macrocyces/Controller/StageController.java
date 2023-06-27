package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Stage;
import com.uts.Macrocyces.Repository.StageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/stage")
@CrossOrigin(origins = "*")
public class StageController {

    @Autowired
    private StageRepository stageRepository;


        @GetMapping("/")
        public ResponseEntity<Object> getAllStages() {
            try {
                List<Stage> stages = stageRepository.findAll();

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", stages);
                response.put("type", "success");
                response.put("message", "Lista de etapas encontrada");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } catch (Exception ex) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Error al buscar la lista de etapas");
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
                response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getStageById(@PathVariable String id) {
        try {
            Optional<Stage> optionalStage = stageRepository.findById(id);
            if (optionalStage.isPresent()) {
                Stage stage = optionalStage.get();

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", stage);
                response.put("type", "success");
                response.put("message", "Etapa encontrada exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Etapa no encontrada");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la etapa");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

        @PostMapping("")
        public ResponseEntity<Object> createStage(@RequestBody Stage stage) {
            try {
                Stage createdStage = stageRepository.save(stage);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", createdStage);
                response.put("type", "success");
                response.put("message", "Etapa creada exitosamente");
                response.put("status", HttpStatus.CREATED.value());

                return ResponseEntity.status(HttpStatus.CREATED).body(response);
            } catch (Exception ex) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Error al crear la etapa");
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }

        @PutMapping("/{id}")
        public ResponseEntity<Object> updateStage(@PathVariable String id, @RequestBody Stage updatedStage) {
            try {
                Optional<Stage> optionalStage = stageRepository.findById(id);
                if (optionalStage.isPresent()) {
                    Stage stage = optionalStage.get();
                    stage.setType(updatedStage.getType());
                    stage.setStart_date(updatedStage.getStart_date());
                    stage.setEnd_date(updatedStage.getEnd_date());
                    Stage savedStage = stageRepository.save(stage);

                    Map<String, Object> response = new LinkedHashMap<>();
                    response.put("data", savedStage);
                    response.put("type", "success");
                    response.put("message", "Estapa actualizada exitosamente");
                    response.put("status", HttpStatus.OK.value());

                    return ResponseEntity.ok(response);
                } else {
                    Map<String, Object> response = new LinkedHashMap<>();
                    response.put("type", "error");
                    response.put("message", "Etapa no encontrada");
                    response.put("status", HttpStatus.NOT_FOUND.value());

                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
            } catch (Exception ex) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Error al actualizar la etapa");
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateStage(@PathVariable String id, @RequestBody Stage updatedStage) {
        try {
            Optional<Stage> optionalStage = stageRepository.findById(id);
            if (optionalStage.isPresent()) {
                Stage stage = optionalStage.get();

                // Verificar si se proporciona un tipo actualizado en el cuerpo de la solicitud
                if (updatedStage.getType() != null) {
                    stage.setType(updatedStage.getType());
                }

                // Verificar si se proporciona una fecha de inicio actualizada en el cuerpo de la solicitud
                if (updatedStage.getStart_date()!= null) {
                    stage.setStart_date(updatedStage.getStart_date());
                }

                // Verificar si se proporciona una fecha de finalización actualizada en el cuerpo de la solicitud
                if (updatedStage.getEnd_date()!= null) {
                    stage.setEnd_date(updatedStage.getEnd_date());
                }

                Stage savedStage = stageRepository.save(stage);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedStage);
                response.put("type", "success");
                response.put("message", "Etapa actualizada exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Etapa no encontrada");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar la Etapa");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @DeleteMapping("/{id}")
        public ResponseEntity<Object> deleteStage(@PathVariable String id) {
            try {
                Optional<Stage> optionalStage = stageRepository.findById(id);
                if (optionalStage.isPresent()) {
                    Stage stage = optionalStage.get();
                    stageRepository.delete(stage);

                    Map<String, Object> response = new LinkedHashMap<>();
                    response.put("type", "success");
                    response.put("message", "Etapa eliminada exitosamente");
                    response.put("status", HttpStatus.OK.value());

                    return ResponseEntity.ok(response);
                } else {
                    Map<String, Object> response = new LinkedHashMap<>();
                    response.put("type", "error");
                    response.put("message", "Etapa no encontrada");
                    response.put("status", HttpStatus.NOT_FOUND.value());

                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
                }
            } catch (Exception ex) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Error al eliminar la etapa");
                response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
            }
        }

    }


