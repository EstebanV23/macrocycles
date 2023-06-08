package com.uts.Macrocyces.Repository;

import com.uts.Macrocyces.Entity.Session;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SessionRepository  extends MongoRepository<Session, String> {
}
