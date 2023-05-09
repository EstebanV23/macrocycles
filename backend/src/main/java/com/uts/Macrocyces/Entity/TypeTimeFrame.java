package com.uts.Macrocyces.Entity;

import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(collation = "type_time_frame")
public class TypeTimeFrame {
    @MongoId
    private String id;
    private String name;

    @DBRef
    private List <TimeFrame> timeFrames;

    public TypeTimeFrame() {
    }

    public TypeTimeFrame(String name, List<TimeFrame> timeFrames) {
        this.name = name;
        this.timeFrames = timeFrames;
    }

    public TypeTimeFrame(String id, String name, List<TimeFrame> timeFrames) {
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
