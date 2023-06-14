package com.uts.Macrocyces.Controller;

import com.uts.Macrocyces.Entity.Session;
import com.uts.Macrocyces.Repository.SessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/session")
@CrossOrigin(origins = "*")
public class SessionController {

    @Autowired
    private SessionRepository sessionRepository;

    @GetMapping("/")
    public ResponseEntity<Object> getAllSessions() {
        try {
            List<Session> sessions = sessionRepository.findAll();

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", sessions);
            response.put("type", "success");
            response.put("message", "Lista de sesiones encontrada");
            response.put("status", HttpStatus.OK.value());

            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la lista de sesiones");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getSessionById(@PathVariable String id) {
        try {
            Optional<Session> optionalSession = sessionRepository.findById(id);
            if (optionalSession.isPresent()) {
                Session session = optionalSession.get();

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", session);
                response.put("type", "success");
                response.put("message", "Sesión encontrada");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Sesión no encontrada");
                response.put("status", HttpStatus.NOT_FOUND);
                response.put("statusCode", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al buscar la sesión");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("")
    public ResponseEntity<Object> addSession(@RequestBody Session session) {
        try {
            Session savedSession = sessionRepository.save(session);

            Map<String, Object> response = new LinkedHashMap<>();
            response.put("data", savedSession);
            response.put("type", "success");
            response.put("message", "Sesión añadida exitosamente");
            response.put("status", HttpStatus.CREATED.value());

            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al añadir la sesión");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSession(@PathVariable String id, @RequestBody Session updatedSession) {
        try {
            Optional<Session> optionalSession = sessionRepository.findById(id);
            if (optionalSession.isPresent()) {
                Session session = optionalSession.get();

                // Actualizar los campos necesarios de la sesión
                session.setDate(updatedSession.getDate());
                session.setSessionNumber(updatedSession.getSessionNumber());
                session.setAmountSportsmans(updatedSession.getAmountSportsmans());
                session.setCategory(updatedSession.getCategory());
                session.setPlace(updatedSession.getPlace());
                session.setTrainner(updatedSession.getTrainner());
                session.setMaterial(updatedSession.getMaterial());
                session.setObjectiveTec(updatedSession.getObjectiveTec());
                session.setObjectivePhysical(updatedSession.getObjectivePhysical());
                session.setObjectiveEducational(updatedSession.getObjectiveEducational());
                session.setStages(updatedSession.getStages());

                Session savedSession = sessionRepository.save(session);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedSession);
                response.put("type", "success");
                response.put("message", "Sesión actualizada exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Sesión no encontrada");
                response.put("status", HttpStatus.NOT_FOUND);
                response.put("statusCode", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar la sesión");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<Object> patchUpdateSession(@PathVariable String id, @RequestBody Session updatedSession) {
        try {
            Optional<Session> optionalSession = sessionRepository.findById(id);
            if (optionalSession.isPresent()) {
                Session session = optionalSession.get();

                // Verificar si se proporciona una fecha actualizada en el cuerpo de la solicitud
                if (updatedSession.getDate() != null) {
                    session.setDate(updatedSession.getDate());
                }

                // Verificar si se proporciona un número de sesión actualizado en el cuerpo de la solicitud
                if (updatedSession.getSessionNumber() != 0) {
                    session.setSessionNumber(updatedSession.getSessionNumber());
                }

                // Verificar si se proporciona una cantidad de deportistas actualizada en el cuerpo de la solicitud
                if (updatedSession.getAmountSportsmans() != 0) {
                    session.setAmountSportsmans(updatedSession.getAmountSportsmans());
                }

                // Verificar si se proporciona una categoría actualizada en el cuerpo de la solicitud
                if (updatedSession.getCategory() != null) {
                    session.setCategory(updatedSession.getCategory());
                }

                // Verificar si se proporciona un lugar actualizado en el cuerpo de la solicitud
                if (updatedSession.getPlace() != null) {
                    session.setPlace(updatedSession.getPlace());
                }

                // Verificar si se proporciona un entrenador actualizado en el cuerpo de la solicitud
                if (updatedSession.getTrainner() != null) {
                    session.setTrainner(updatedSession.getTrainner());
                }

                // Verificar si se proporciona una lista de materiales actualizada en el cuerpo de la solicitud
                if (updatedSession.getMaterial() != null) {
                    session.setMaterial(updatedSession.getMaterial());
                }

                // Verificar si se proporciona un objetivo técnico actualizado en el cuerpo de la solicitud
                if (updatedSession.getObjectiveTec() != null) {
                    session.setObjectiveTec(updatedSession.getObjectiveTec());
                }

                // Verificar si se proporciona un objetivo físico actualizado en el cuerpo de la solicitud
                if (updatedSession.getObjectivePhysical() != null) {
                    session.setObjectivePhysical(updatedSession.getObjectivePhysical());
                }

                // Verificar si se proporciona un objetivo educacional actualizado en el cuerpo de la solicitud
                if (updatedSession.getObjectiveEducational() != null) {
                    session.setObjectiveEducational(updatedSession.getObjectiveEducational());
                }

                // Verificar si se proporciona una lista de etapas de sesión actualizada en el cuerpo de la solicitud
                if (updatedSession.getStages() != null) {
                    session.setStages(updatedSession.getStages());
                }

                Session savedSession = sessionRepository.save(session);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("data", savedSession);
                response.put("type", "success");
                response.put("message", "Sesión actualizada exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.ok(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Sesión no encontrada");
                response.put("status", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al actualizar la Sesión");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSession(@PathVariable String id) {
        try {
            Optional<Session> optionalSession = sessionRepository.findById(id);
            if (optionalSession.isPresent()) {
                Session session = optionalSession.get();
                sessionRepository.delete(session);

                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "success");
                response.put("message", "Sesión eliminada exitosamente");
                response.put("status", HttpStatus.OK.value());

                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                Map<String, Object> response = new LinkedHashMap<>();
                response.put("type", "error");
                response.put("message", "Sesión no encontrada");
                response.put("status", HttpStatus.NOT_FOUND);
                response.put("statusCode", HttpStatus.NOT_FOUND.value());

                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
            }
        } catch (Exception ex) {
            Map<String, Object> response = new LinkedHashMap<>();
            response.put("type", "error");
            response.put("message", "Error al eliminar la sesión");
            response.put("status", HttpStatus.INTERNAL_SERVER_ERROR);
            response.put("statusCode", HttpStatus.INTERNAL_SERVER_ERROR.value());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}
