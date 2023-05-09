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

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/typetimeframe")
@CrossOrigin(origins = "*")
public class TypeTimeFrameController {

    @Autowired
    private TypeTimeFrameRepository typeTimeFrameRepository;
    @Autowired
    private TimeFrameRepository timeFrameRepository;
    

    @GetMapping("/name/{typetimeframeName}")
    public ResponseEntity<Object> getTypeTimeFrame(@PathVariable String typeTimeFrameName) {
        try {
            TypeTimeFrame typeTimeFrame = typeTimeFrameRepository.findByName(typeTimeFrameName)
                    .orElseThrow(() -> new ResourceNotFoundException("TypeTimeFrame not found for name: " + typeTimeFrameName));
            List<TimeFrame> timeFrame = timeFrameRepository.findByTypeTimeFrame(typeTimeFrame);

            if (timeFrame == null) {
                typeTimeFrame.setTimeFrames(null);
            } else {
                typeTimeFrame.setTimeFrames(timeFrame);
            }

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", typeTimeFrame);
            response.put("type", "success");
            response.put("message", "TypeTimeFrame encontrado");
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
            response.put("message", "Error al buscar TypeTimeFrame");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/types")
    public ResponseEntity<Object> getAllTypeTimeFrame() {
        try {
            List<TypeTimeFrame> allTypeTimeFrame = typeTimeFrameRepository.findAll();
            for (TypeTimeFrame typeTimeFrame : allTypeTimeFrame) {
                List<TimeFrame> timeFrames = timeFrameRepository.findByTypeTimeFrame(typeTimeFrame);
                typeTimeFrame.setTimeFrames(timeFrames);
            }
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", allTypeTimeFrame);
            response.put("type", "success");
            response.put("message", "Lista TypeTimeFrame encontrada");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista TypeTimeFrame");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> createTypeTimeFrame(@RequestBody Map<String, Object> body) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            TypeTimeFrame typeTimeFrame = mapper.convertValue(body, TypeTimeFrame.class);
            TypeTimeFrame createdTypeMesocycle = typeTimeFrameRepository.save(typeTimeFrame);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", createdTypeMesocycle);
            response.put("type", "success");
            response.put("message", "TypeTimeFrame created successfully");
            response.put("status", "OK");
            response.put("statusCode", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Failed to create TypeTimeFrame");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
