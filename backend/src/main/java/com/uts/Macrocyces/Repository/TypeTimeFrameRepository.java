package com.uts.Macrocyces.Repository;


import com.uts.Macrocyces.Entity.TypeTimeFrame;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface TypeTimeFrameRepository extends MongoRepository<TypeTimeFrame, String> {

    TypeTimeFrame getTypeTimeFrameById(String id);

    Optional<TypeTimeFrame> findByName(String typeTimeFrameName);

}
