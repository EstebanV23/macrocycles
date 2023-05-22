package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Stage;
import com.uts.Macrocyces.Entity.TimeFrame;
import com.uts.Macrocyces.Repository.StageRepository;
import com.uts.Macrocyces.Repository.TimeFrameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/stage")
@CrossOrigin(origins = "*")
public class StageController {

    @Autowired
    private StageRepository stageRepository;

    @Autowired
    private TimeFrameRepository timeFrameRepository;
    @GetMapping("/")
    public ResponseEntity<Object> getAllStages() {
        try {
            List<Stage> stages = stageRepository.findAll();

            // Crear la respuesta con los TimeFrames incluidos
            List<Map<String, Object>> stageList = new ArrayList<>();
            for (Stage stage : stages) {
                Map<String, Object> stageMap = new LinkedHashMap<>();
                stageMap.put("id", stage.getId());
                stageMap.put("name", stage.getName());
                stageMap.put("timeFrames", stage.getTimeFrames());
                stageList.add(stageMap);
            }

            // Crear la respuesta final
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
    public ResponseEntity<Object> createStage(@RequestBody Stage stageRequest) {
    try {
        List<TimeFrame> timeFrames = new ArrayList<>();
        for (TimeFrame timeFrame : stageRequest.getTimeFrames()) {
            Optional<TimeFrame> existingTimeFrame = timeFrameRepository.findById(timeFrame.getId());
            existingTimeFrame.ifPresent(tf -> {
                tf.setStage(stageRequest); // Establece la relación inversa con el Stage
                timeFrames.add(tf);
            });
        }

        // Crear una copia del objeto stageRequest
        Stage stage = new Stage();
        stage.setName(stageRequest.getName());

        // Establecer la relación con los timeFrames
        stage.setTimeFrames(timeFrames);

        // Guardar la entidad Stage en la base de datos
        Stage savedStage = stageRepository.save(stage);

        // Actualizar la relación inversa en los TimeFrames
        for (TimeFrame timeFrame : timeFrames) {
            timeFrame.setStage(savedStage);
        }

        // Guardar los TimeFrames actualizados en la base de datos
        timeFrameRepository.saveAll(timeFrames);

        // Crear la respuesta
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("data", savedStage);
        response.put("type", "success");
        response.put("message", "La etapa fue creada exitosamente");
        response.put("status", "OK");
        response.put("statusCode", HttpStatus.OK.value());

        return ResponseEntity.status(HttpStatus.OK).body(response);
    } catch (Exception ex) {
        Map<String, Object> response = new LinkedHashMap<>();
        response.put("type", "error");
        response.put("message", "Error al crear la etapa");
        response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
        response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }
}

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateStage(@PathVariable("id") String stageId, @RequestBody Stage stageRequest) {
        try {
            Optional<Stage> existingStage = stageRepository.findById(stageId);

            if (existingStage.isPresent()) {
                Stage stage = existingStage.get();
                stage.setName(stageRequest.getName());

                List<TimeFrame> timeFrames = new ArrayList<>();
                for (TimeFrame timeFrame : stageRequest.getTimeFrames()) {
                    Optional<TimeFrame> existingTimeFrame = timeFrameRepository.findById(timeFrame.getId());
                    existingTimeFrame.ifPresentOrElse(
                            tf -> {
                                tf.setStage(stage);
                                timeFrames.add(tf);
                            },
                            () -> {
                                timeFrames.add(timeFrame);
                            }
                    );
                }

                stage.setTimeFrames(timeFrames);

                Stage savedStage = stageRepository.save(stage);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedStage);
                response.put("type", "success");
                response.put("message", "La etapa fue actualizada exitosamente");
                response.put("status", "OK");
                response.put("statusCode", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "No se encontró la etapa con el ID proporcionado");
                response.put("status", HttpStatus.NOT_FOUND);
                response.put("statusCode", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar la etapa");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }



}
