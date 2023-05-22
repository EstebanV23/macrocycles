package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.TypeSession;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TypeSessionRepository extends MongoRepository<TypeSession ,String> {
}
