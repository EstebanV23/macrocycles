package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Exercise;
import com.uts.Macrocyces.Entity.SessionStage;
import com.uts.Macrocyces.Repository.ExerciseRepository;
import com.uts.Macrocyces.Repository.SessionStageRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/exercise")
@CrossOrigin(origins = "*")
public class ExerciseController {
    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private SessionStageRepository sessionStageRepository;



    @GetMapping("/")
    public ResponseEntity<Object> getExercises() {
        try {
            List<Exercise> exercises = exerciseRepository.findAll();
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "success");
            response.put("message", "Ejercicios obtenidos exitosamente");
            response.put("status", HttpStatus.OK.value());
            response.put("exercises", exercises);

            return ResponseEntity.ok(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al obtener los ejercicios");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getExerciseById(@PathVariable String id) {
        try {
            Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
            if (optionalExercise.isPresent()) {
                Exercise exercise = optionalExercise.get();

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", exercise);
                response.put("type", "success");
                response.put("message", "Ejercicio encontrado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Ejercicio no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar el Ejercicio");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> createExercise(@RequestBody Exercise exercise) {
        try {
            Exercise createdExercise = exerciseRepository.save(exercise);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", createdExercise);
            response.put("type", "success");
            response.put("message", "Ejercicio creado exitosamente");
            response.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al crear el Ejercicio");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> updateExercise(@PathVariable String id, @RequestBody Exercise updatedExercise) {
        try {
            Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
            if (optionalExercise.isPresent()) {
                Exercise exercise = optionalExercise.get();
                exercise.setName(updatedExercise.getName());
                exercise.setDescription(updatedExercise.getDescription());
                exercise.setDuration(updatedExercise.getDuration());
                Exercise savedExercise = exerciseRepository.save(exercise);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedExercise);
                response.put("type", "success");
                response.put("message", "Ejercicio actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Ejercicio no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el Ejercicio");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateExercise(@PathVariable String id, @RequestBody Exercise updatedExercise) {
        try {
            Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
            if (optionalExercise.isPresent()) {
                Exercise exercise = optionalExercise.get();

                // Verificar si se proporciona un nombre actualizado en el cuerpo de la solicitud
                if (updatedExercise.getName() != null) {
                    exercise.setName(updatedExercise.getName());
                }

                // Verificar si se proporciona una descripción actualizada en el cuerpo de la solicitud
                if (updatedExercise.getDescription() != null) {
                    exercise.setDescription(updatedExercise.getDescription());
                }

                // Verificar si se proporciona una duración actualizada en el cuerpo de la solicitud
                if (updatedExercise.getDuration() != 0) {
                    exercise.setDuration(updatedExercise.getDuration());
                }

                Exercise savedExercise = exerciseRepository.save(exercise);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedExercise);
                response.put("type", "success");
                response.put("message", "Ejercicio actualizado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Ejercicio no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar el Ejercicio");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }




    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteExercise(@PathVariable String id) {
        try {
            Optional<Exercise> optionalExercise = exerciseRepository.findById(id);
            if (optionalExercise.isPresent()) {
                Exercise exercise = optionalExercise.get();
                exerciseRepository.delete(exercise);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "success");
                response.put("message", "Ejercicio eliminado exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Ejercicio no encontrado");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar el Ejercicio");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

