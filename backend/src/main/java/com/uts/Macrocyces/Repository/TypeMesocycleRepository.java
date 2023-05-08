package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.TypeMesocycle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TypeMesocycleRepository extends MongoRepository<TypeMesocycle, String> {
    TypeMesocycle getTypeMicrocycleById(String id);

    Optional <TypeMesocycle> findByName(String typeMesocycleName);


}
