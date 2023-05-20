package com.uts.Macrocyces.Controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.uts.Macrocyces.Entity.TimeFrame;
import com.uts.Macrocyces.Entity.TypeTimeFrame;
import com.uts.Macrocyces.Exceptions.ResourceNotFoundException;
import com.uts.Macrocyces.Repository.TimeFrameRepository;
import com.uts.Macrocyces.Repository.TypeTimeFrameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/timeframes")
@CrossOrigin(origins = "*")
public class TimeFrameController {

    @Autowired
    private TimeFrameRepository timeFrameRepository;

    @Autowired
    private TypeTimeFrameRepository typeTimeFrameRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllTimeFrames() {
        try {
            List<TimeFrame> timeFrames = timeFrameRepository.findAll();

            List<Map<String, Object>> timeFramesData = new ArrayList<>();
            for (TimeFrame timeFrame : timeFrames) {
                Map<String, Object> timeFrameData = new LinkedHashMap<>();
                timeFrameData.put("id", timeFrame.getId());
                timeFrameData.put("typeTimeFrame", timeFrame.getTypeTimeFrame());
                timeFrameData.put("stage", timeFrame.getStage()); // Nuevo atributo añadido

                timeFramesData.add(timeFrameData);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", timeFramesData);
            response.put("type", "success");
            response.put("message", "Lista de timeFrames encontrada");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de timeFrames");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PostMapping("")
    public ResponseEntity<Object> createTimeFrame(@RequestBody Map<String, Object> body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            TimeFrame timeFrame = mapper.convertValue(body, TimeFrame.class);
            String typeTimeFrameName = (String) body.get("typeTimeFrame");
            TypeTimeFrame typeTimeFrame = typeTimeFrameRepository.findByName(typeTimeFrameName)
                    .orElseThrow(() -> new ResourceNotFoundException("El typeTimeFrame no se encuentra con ese nombre : " + typeTimeFrameName));
            timeFrame.setTypeTimeFrame(typeTimeFrame);
            timeFrameRepository.save(timeFrame);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", timeFrame);
            response.put("type", "success");
            response.put("message", "typeTimeFrame creado exitosamente");
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
    public ResponseEntity<Object> updateTimeFrame(@PathVariable(value = "id") String timeFrameId, @RequestBody Map<String, Object> body) {
        try {
            TimeFrame timeFrame = timeFrameRepository.findById(timeFrameId)
                    .orElseThrow(() -> new ResourceNotFoundException("TimeFrame not found for this id :: " + timeFrameId));

            ObjectMapper mapper = new ObjectMapper();
            TimeFrame updatedTimeFrame = mapper.convertValue(body, TimeFrame.class);
            updatedTimeFrame.setId(timeFrame.getId());
            String typeTimeFrameName = (String) body.get("typeTimeFrame");
            TypeTimeFrame typeTimeFrame = typeTimeFrameRepository.findByName(typeTimeFrameName)
                    .orElseThrow(() -> new ResourceNotFoundException("TypeTimeFrame not found for this name :: " + typeTimeFrameName));

            updatedTimeFrame.setTypeTimeFrame(typeTimeFrame);
            final TimeFrame savedMesocycle = timeFrameRepository.save(updatedTimeFrame);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedMesocycle);
            response.put("type", "success");
            response.put("message", "TimeFrame actualizado exitosamente");
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
    public ResponseEntity<Map<String, Object>> deleteTimeFrame(@PathVariable(value = "id") String timeFrameId) {
        try {

            TimeFrame timeframe = timeFrameRepository.findById(timeFrameId)
                    .orElseThrow(() -> new ResourceNotFoundException("TimeFrame not found for this id :: " + timeFrameId));

            timeFrameRepository.delete(timeframe);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("message", "TimeFrame eliminado exitosamente");
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
            response.put("message", "No se pudo eliminar el TimeFrame con id: " + timeFrameId);
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
