package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Macrocycle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MacrocycleRepository extends MongoRepository<Macrocycle, String> {
    List<Macrocycle> findByType(int type);

}
