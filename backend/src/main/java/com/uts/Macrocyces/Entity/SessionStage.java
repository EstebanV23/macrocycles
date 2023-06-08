package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(collection = "session_stage")
@JsonIgnoreProperties(ignoreUnknown = true)
public class SessionStage {
    @MongoId
    private String id;
    private String name;
    @DBRef
    private List<Exercise> exercises;



    public SessionStage() {
    }

    public SessionStage(String name, List<Exercise> exercises) {
        this.name = name;
        this.exercises = exercises;
    }

    public SessionStage(String id, String name, List<Exercise> exercises) {
        this.id = id;
        this.name = name;
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

    public List<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(List<Exercise> exercises) {
        this.exercises = exercises;
    }
}
