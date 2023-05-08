package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Mesocycle;
import com.uts.Macrocyces.Entity.TypeMesocycle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface  MesocycleRepository extends MongoRepository<Mesocycle , String> {

    List<Mesocycle> findByTypeMesocycle(TypeMesocycle typeMesocycle);

}
