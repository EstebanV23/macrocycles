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



/*
    @PostMapping("")
    public ResponseEntity<Object> createStage(@RequestBody Stage stageRequest) {
        try {
            List<TimeFrame> timeFrames = new ArrayList<>();
            for (TimeFrame timeFrame : stageRequest.getTimeFrames()) {
                Optional<TimeFrame> existingTimeFrame = timeFrameRepository.findById(timeFrame.getId());
                existingTimeFrame.ifPresent(timeFrames::add);
            }

            Stage stage = new Stage();
            stage.setName(stageRequest.getName());
            stage.setTimeFrames(timeFrames);

            Stage savedStage = stageRepository.save(stage);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedStage);
            response.put("type", "success");
            response.put("message", "La estapa fue creada exitosamente");
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
*/
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

        Stage stage = new Stage();
        stage.setName(stageRequest.getName());
        stage.setTimeFrames(timeFrames);

        Stage savedStage = stageRepository.save(stage);

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


}
