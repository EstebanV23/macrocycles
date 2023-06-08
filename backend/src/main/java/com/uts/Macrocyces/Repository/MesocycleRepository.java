package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Mesocycle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MesocycleRepository extends MongoRepository<Mesocycle, String> {
}
