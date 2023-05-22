package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Stage;
import com.uts.Macrocyces.Entity.TimeFrame;
import com.uts.Macrocyces.Exceptions.ResourceNotFoundException;
import com.uts.Macrocyces.Repository.StageRepository;
import com.uts.Macrocyces.Repository.TimeFrameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stage")
@CrossOrigin(origins = "*")
public class StageController {

    @Autowired
    private StageRepository stageRepository;

    @GetMapping("/get")
    public  List<Stage> getAllmm(){
        List<Stage> complete =  stageRepository.findAll();
        List<Stage> stages = new ArrayList<>();
        for (Stage stage : complete){
            List<TimeFrame> timeframes = stage.getTimeFrames();
            List<TimeFrame> times = new ArrayList<>();
            for (TimeFrame timeFrame : timeframes){
                timeFrame.setStage(null);
                times.add(timeFrame);
            }
            stage.setTimeFrames(times);
            stages.add(stage);
        }
        return  stages;
    }

    @GetMapping("/")
    public ResponseEntity<Object> getAllStages() {
        try {
            List<Stage> stages = stageRepository.findAll();

            List<Map<String, Object>> stageList = new ArrayList<>();
            for (Stage stage : stages) {
                Map<String, Object> stageMap = new LinkedHashMap<>();
                stageMap.put("id", stage.getId());
                stageMap.put("name", stage.getName());

                List<TimeFrame> timeFrames = new ArrayList<>();
                for (TimeFrame timeFrame : stage.getTimeFrames()) {
                    timeFrame.setStage(null);
                    timeFrames.add(timeFrame);
                }
                stageMap.put("timeFrames", timeFrames);

                stageList.add(stageMap);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", stageList);
            response.put("type", "success");
            response.put("message", "Lista de etapas obtenida exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al obtener la lista de etapas");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PostMapping("")
    public ResponseEntity<Object> addStage(@RequestBody Stage newStage) {
        try {
            // Guardar el nuevo Stage en la base de datos
            Stage savedStage = stageRepository.save(newStage);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedStage);
            response.put("type", "success");
            response.put("message", "La etapa se añadido exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al añadir la etapa");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{stageId}")
    public ResponseEntity<Object> updateStage(@PathVariable(value = "stageId") String stageId, @RequestBody Stage updatedStage) {
        try {
            Stage existingStage = stageRepository.findById(stageId)
                    .orElseThrow(() -> new ResourceNotFoundException("No se encontro el id de la etapa : " + stageId));

            // Actualizar los campos del stage existente con los valores del stage actualizado
            existingStage.setName(updatedStage.getName());

            // Actualizar la lista de TimeFrames
            existingStage.getTimeFrames().clear(); // Limpiar la lista actual
            existingStage.getTimeFrames().addAll(updatedStage.getTimeFrames());

            // Guardar el stage actualizado en la base de datos
            Stage savedStage = stageRepository.save(existingStage);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedStage);
            response.put("type", "success");
            response.put("message", "Etapa actualizada exitosamente");
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
            response.put("message", "Error al actualizar la etapa");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @DeleteMapping("/{stageId}")
    public ResponseEntity<Object> deleteStage(@PathVariable String stageId) {
        try {
            // Verificar si el Stage existe en la base de datos
            Optional<Stage> optionalStage = stageRepository.findById(stageId);
            if (!optionalStage.isPresent()) {
                throw new ResourceNotFoundException("No se encontro una etapa con ese id : " + stageId);
            }

            // Eliminar el Stage de la base de datos
            stageRepository.deleteById(stageId);

            // Crear la respuesta de éxito
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "success");
            response.put("message", "Etapa eliminada exitosamente");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (ResourceNotFoundException ex) {
            // Manejar el caso cuando el Stage no se encuentra
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", ex.getMessage());
            response.put("status", HttpStatus.NOT_FOUND);
            response.put("statusCode", HttpStatus.NOT_FOUND.value());

            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        } catch (Exception ex) {
            // Manejar cualquier otro error
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar la etapa");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }





}
