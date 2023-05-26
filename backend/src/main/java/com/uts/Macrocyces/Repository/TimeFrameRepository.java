package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.TimeFrame;
import org.springframework.data.mongodb.core.mapping.MongoId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeFrameRepository extends MongoRepository<TimeFrame, String> {
}
