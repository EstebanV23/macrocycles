package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "mesocycles")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Mesocycle {
    @MongoId
    private String id;
    private String type;
    private LocalDate startDate;
    private LocalDate endDate;

    @DBRef
    private List<Microcycle> microcycles;

    public Mesocycle() {
    }

    public Mesocycle(String type, LocalDate startDate, LocalDate endDate, List<Microcycle> microcycles) {
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.microcycles = microcycles;
    }

    public Mesocycle(String id, String type, LocalDate startDate, LocalDate endDate, List<Microcycle> microcycles) {
        this.id = id;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.microcycles = microcycles;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    public List<Microcycle> getMicrocycles() {
        return microcycles;
    }

    public void setMicrocycles(List<Microcycle> microcycles) {
        this.microcycles = microcycles;
    }
}
