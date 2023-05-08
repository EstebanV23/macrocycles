package com.uts.Macrocyces.Controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.uts.Macrocyces.Entity.Mesocycle;
import com.uts.Macrocyces.Entity.TypeMesocycle;
import com.uts.Macrocyces.Exceptions.ResourceNotFoundException;
import com.uts.Macrocyces.Repository.MesocycleRepository;
import com.uts.Macrocyces.Repository.TypeMesocycleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/typemesocycles")
@CrossOrigin(origins = "*")
public class TypeMesocycleController {

    @Autowired
    private TypeMesocycleRepository typeMesocycleRepository;

    @Autowired
    private MesocycleRepository mesocycleRepository;



    @GetMapping("/name/{typeMesocycleName}")
    public ResponseEntity<TypeMesocycle> getTypeMesocycle(@PathVariable String typeMesocycleName) throws ResourceNotFoundException {
        TypeMesocycle typeMesocycle = typeMesocycleRepository.findByName(typeMesocycleName)
                .orElseThrow(() -> new ResourceNotFoundException("TypeMesocycle not found for name: " + typeMesocycleName));
        List<Mesocycle> mesocycles = mesocycleRepository.findByTypeMesocycle(typeMesocycle);

        if (mesocycles == null) {
            typeMesocycle.setMesocycles(null);
        } else {
            typeMesocycle.setMesocycles(mesocycles);
        }
        return ResponseEntity.ok().body(typeMesocycle);
    }

    @GetMapping("/types")
    public ResponseEntity<List<TypeMesocycle>> getAllTypeMesocycles() {
        List<TypeMesocycle> allTypeMesocycles = typeMesocycleRepository.findAll();
        for (TypeMesocycle typeMesocycle : allTypeMesocycles) {
            List<Mesocycle> mesocycles = mesocycleRepository.findByTypeMesocycle(typeMesocycle);
            typeMesocycle.setMesocycles(mesocycles);
        }
        return ResponseEntity.ok().body(allTypeMesocycles);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TypeMesocycle> getTtypemesocyclesById(@PathVariable(value = "id") String typeMesocycleId) throws ResourceNotFoundException {
        TypeMesocycle typeMesocycle = typeMesocycleRepository.findById(typeMesocycleId)
                .orElseThrow(() -> new ResourceNotFoundException("TypeMicrocycle not found for this id :: " + typeMesocycleId));
        return ResponseEntity.ok().body(typeMesocycle);
    }

    @PostMapping("")
    public TypeMesocycle createTypeMesocycles(@RequestBody Map<String, Object> body) {
        ObjectMapper mapper = new ObjectMapper();
        TypeMesocycle typeMesocycle = mapper.convertValue(body, TypeMesocycle.class);
        return typeMesocycleRepository.save(typeMesocycle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TypeMesocycle> updateTypeMesocycles(@PathVariable(value = "id") String typeMicrocycleId, @RequestBody Map<String, Object> body) throws ResourceNotFoundException {
        TypeMesocycle typeMesocycle = typeMesocycleRepository.findById(typeMicrocycleId)
                .orElseThrow(() -> new ResourceNotFoundException("TypeMicrocycle not found for this id :: " + typeMicrocycleId));

        ObjectMapper mapper = new ObjectMapper();
        TypeMesocycle updatedTypeMesocycle = mapper.convertValue(body, TypeMesocycle.class);
        updatedTypeMesocycle.setId(typeMesocycle.getId());

        final TypeMesocycle savedTypeMesocycle = typeMesocycleRepository.save(updatedTypeMesocycle);
        return ResponseEntity.ok(savedTypeMesocycle);
    }

    @DeleteMapping("/{id}")
    public Map<String, Boolean> deleteTypeMesocycles(@PathVariable(value = "id") String typeMicrocycleId) throws ResourceNotFoundException {
        TypeMesocycle typeMesocycle = typeMesocycleRepository.findById(typeMicrocycleId)
                .orElseThrow(() -> new ResourceNotFoundException("TypeMicrocycle not found for this id :: " + typeMicrocycleId));

        typeMesocycleRepository.delete(typeMesocycle);

        Map<String, Boolean> response = new HashMap<>();
        response.put("deleted", Boolean.TRUE);

        return response;
    }




}


