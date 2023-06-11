package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Exercise;
import com.uts.Macrocyces.Entity.SessionStage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {
    List<Exercise> findBySessionStage(SessionStage sessionStage);

}
