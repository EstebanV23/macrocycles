package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.StageSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StageSessionRepository extends MongoRepository<StageSession, String> {
}
