package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.ArrayList;
import java.util.List;

@Document(collection = "stage")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Stage {

    @MongoId
    private String id;
    private String name;


    @DBRef
    private List<TimeFrame> timeFrames;


    public Stage() {
    }

    public Stage(String name, List<TimeFrame> timeFrames) {
        this.name = name;
        this.timeFrames = timeFrames;
    }

    public Stage(String id, String name, List<TimeFrame> timeFrames) {
        this.id = id;
        this.name = name;
        this.timeFrames = timeFrames;
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

    public List<TimeFrame> getTimeFrames() {
        return timeFrames;
    }

    public void setTimeFrames(List<TimeFrame> timeFrames) {
        this.timeFrames = timeFrames;
    }
}
