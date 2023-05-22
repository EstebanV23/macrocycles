package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Exercises;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExercisesRepository extends MongoRepository<Exercises, String> {
}
