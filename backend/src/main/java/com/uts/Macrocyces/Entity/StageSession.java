package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(collection = "stage_session")
@JsonIgnoreProperties(ignoreUnknown = true)
public class StageSession {

    @MongoId
    private String id;
    private String name;
    private String image;

    @DBRef
    private List<TypeSession> typeSessions;

    @DBRef
    private Exercises exercises;

    public StageSession() {
    }

    public StageSession(String name, String image, List<TypeSession> typeSessions, Exercises exercises) {
        this.name = name;
        this.image = image;
        this.typeSessions = typeSessions;
        this.exercises = exercises;
    }

    public StageSession(String id, String name, String image, List<TypeSession> typeSessions, Exercises exercises) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.typeSessions = typeSessions;
        this.exercises = exercises;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public List<TypeSession> getTypeSessions() {
        return typeSessions;
    }

    public void setTypeSessions(List<TypeSession> typeSessions) {
        this.typeSessions = typeSessions;
    }

    public Exercises getExercises() {
        return exercises;
    }

    public void setExercises(Exercises exercises) {
        this.exercises = exercises;
    }
}
