package com.uts.Macrocyces.Repository;


import com.uts.Macrocyces.Entity.Stage;
import com.uts.Macrocyces.Entity.TimeFrame;
import com.uts.Macrocyces.Entity.TypeTimeFrame;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TimeFrameRepository extends MongoRepository<TimeFrame, String> {
    List<TimeFrame> findByTypeTimeFrame(TypeTimeFrame typeTimeFrame);

    Optional<TimeFrame> findById(String id);

    List<TimeFrame> findByStage(Stage stage);



}
