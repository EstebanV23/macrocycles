package com.uts.Macrocyces.Repository;


import com.uts.Macrocyces.Entity.TimeFrame;
import com.uts.Macrocyces.Entity.TypeTimeFrame;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TimeFrameRepository extends MongoRepository<TimeFrame, String> {
    List<TimeFrame> findByTypeTimeFrame(TypeTimeFrame typeTimeFrame);
}
