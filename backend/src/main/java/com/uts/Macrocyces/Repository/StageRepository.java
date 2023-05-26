package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Stage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageRepository extends MongoRepository<Stage, String> {
}
