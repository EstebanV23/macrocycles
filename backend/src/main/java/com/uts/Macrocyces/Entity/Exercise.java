package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.Objects;

@Document(collection = "exercise")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Exercise {

    @MongoId
    private String id;
    private String name;
    private String description;
    private int duration;
    @JsonIgnore
    @DBRef
    private SessionStage sessionStage;

    public Exercise() {
    }

    public Exercise(String name, String description, int duration, SessionStage sessionStage) {
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.sessionStage = sessionStage;
    }

    public Exercise(String id, String name, String description, int duration, SessionStage sessionStage) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.duration = duration;
        this.sessionStage = sessionStage;
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

    public int getDuration() {
        return duration;
    }

    public void setDuration(int duration) {
        this.duration = duration;
    }

    public SessionStage getSessionStage() {
        return sessionStage;
    }

    public void setSessionStage(SessionStage sessionStage) {
        this.sessionStage = sessionStage;
    }




}
