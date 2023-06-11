package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Exercise;
import com.uts.Macrocyces.Entity.SessionStage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionStageRepository extends MongoRepository<SessionStage, String> {

}
