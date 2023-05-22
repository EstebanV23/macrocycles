package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(collection = "excercise")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Exercises {

    @MongoId
    private String id;
    private String name;
    private String description;
    private String duration;
    @DBRef
    private List<StageSession> stageSessions;

    public Exercises() {
    }

    public Exercises(String name, String description, String duration, List<StageSession> stageSessions) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.stageSessions = stageSessions;
    }

    public Exercises(String id, String name, String description, String duration, List<StageSession> stageSessions) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.stageSessions = stageSessions;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public List<StageSession> getStageSessions() {
        return stageSessions;
    }

    public void setStageSessions(List<StageSession> stageSessions) {
        this.stageSessions = stageSessions;
    }
}
