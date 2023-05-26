package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Exercise;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface ExerciseRepository extends MongoRepository<Exercise, String> {

}
