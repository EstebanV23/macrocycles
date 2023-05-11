package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "time_frame")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TimeFrame {
    @MongoId
    private String id;

    @DBRef
    private TypeTimeFrame typeTimeFrame;

    public TimeFrame() {
    }

    public TimeFrame(TypeTimeFrame typeTimeFrame) {
        this.typeTimeFrame = typeTimeFrame;
    }

    public TimeFrame(String id, TypeTimeFrame typeTimeFrame) {
        this.id = id;
        this.typeTimeFrame = typeTimeFrame;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public TypeTimeFrame getTypeTimeFrame() {
        return typeTimeFrame;
    }

    public void setTypeTimeFrame(TypeTimeFrame typeTimeFrame) {
        this.typeTimeFrame = typeTimeFrame;
    }
}
