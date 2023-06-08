package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Microcycle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MicrocycleRepository extends MongoRepository<Microcycle, String> {
}
