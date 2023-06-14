package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.TimeFrame;
import com.uts.Macrocyces.Repository.TimeFrameRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/time-frame")
@CrossOrigin(origins = "*")
public class TimeFrameController {

    @Autowired
    private TimeFrameRepository timeFrameRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllTimeFrames() {
        try {
            List<TimeFrame> timeFrames = timeFrameRepository.findAll();

            if (!timeFrames.isEmpty()) {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", timeFrames);
                response.put("type", "success");
                response.put("message", "Lista de los periodos encontrados");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", timeFrames);
                response.put("type", "error");
                response.put("message", "No se encontraron los periodos");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de los periodos");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @GetMapping("/{id}")
    public ResponseEntity<Object> getTimeFrameById(@PathVariable String id) {
        try {
            Optional<TimeFrame> optionalTimeFrame = timeFrameRepository.findById(id);
            if (optionalTimeFrame.isPresent()) {
                TimeFrame timeFrame = optionalTimeFrame.get();

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", timeFrame);
                response.put("type", "success");
                response.put("message", "Periodo encontrado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Periodo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar el Periodo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PostMapping("")
    public ResponseEntity<Object> createTimeFrame(@RequestBody TimeFrame timeFrame) {
        try {
            TimeFrame createdTimeFrame = timeFrameRepository.save(timeFrame);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", createdTimeFrame);
            response.put("type", "success");
            response.put("message", "Periodo creado exitosamente");
            response.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al crear el periodo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateTimeFrame(@PathVariable String id, @RequestBody TimeFrame updatedTimeFrame) {
        try {
            Optional<TimeFrame> optionalTimeFrame = timeFrameRepository.findById(id);
            if (optionalTimeFrame.isPresent()) {
                TimeFrame timeFrame = optionalTimeFrame.get();
                timeFrame.setType(updatedTimeFrame.getType());
                timeFrame.setStart_date(updatedTimeFrame.getStart_date());
                timeFrame.setEnd_date(updatedTimeFrame.getEnd_date());
                TimeFrame savedTimeFrame = timeFrameRepository.save(timeFrame);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedTimeFrame);
                response.put("type", "success");
                response.put("message", "Periodo actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Periodo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el Periodo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateTimeFrame(@PathVariable String id, @RequestBody TimeFrame updatedTimeFrame) {
        try {
            Optional<TimeFrame> optionalTimeFrame = timeFrameRepository.findById(id);
            if (optionalTimeFrame.isPresent()) {
                TimeFrame timeFrame = optionalTimeFrame.get();

                // Verificar si se proporciona un tipo actualizado en el cuerpo de la solicitud
                if (updatedTimeFrame.getType() != null) {
                    timeFrame.setType(updatedTimeFrame.getType());
                }

                // Verificar si se proporciona una fecha de inicio actualizada en el cuerpo de la solicitud
                if (updatedTimeFrame.getStart_date() != null) {
                    timeFrame.setStart_date(updatedTimeFrame.getStart_date());
                }

                // Verificar si se proporciona una fecha de finalización actualizada en el cuerpo de la solicitud
                if (updatedTimeFrame.getEnd_date() != null) {
                    timeFrame.setEnd_date(updatedTimeFrame.getEnd_date());
                }

                TimeFrame savedTimeFrame = timeFrameRepository.save(timeFrame);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedTimeFrame);
                response.put("type", "success");
                response.put("message", "Periodo actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Periodo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el periodo");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteTimeFrame(@PathVariable String id) {
        try {
            Optional<TimeFrame> optionalTimeFrame = timeFrameRepository.findById(id);
            if (optionalTimeFrame.isPresent()) {
                TimeFrame timeFrame = optionalTimeFrame.get();
                timeFrameRepository.delete(timeFrame);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "success");
                response.put("message", "Periodo eliminado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Periodo no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar el TimeFrame");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

}
