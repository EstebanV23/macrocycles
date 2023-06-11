package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "microcycles")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Microcycle {
    @MongoId
    private String id;
    private String type;
    private LocalDate startDate;
    private LocalDate endDate;
    private int frequency;
    private String test;
    @DBRef
    private List<Session> sessions;

    public Microcycle() {
    }

    public Microcycle(String type, LocalDate startDate, LocalDate endDate, int frequency, String test, List<Session> sessions) {
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.frequency = frequency;
        this.test = test;
        this.sessions = sessions;
    }

    public Microcycle(String id, String type, LocalDate startDate, LocalDate endDate, int frequency, String test, List<Session> sessions) {
        this.id = id;
        this.type = type;
        this.startDate = startDate;
        this.endDate = endDate;
        this.frequency = frequency;
        this.test = test;
        this.sessions = sessions;
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

    public int getFrequency() {
        return frequency;
    }

    public void setFrequency(int frequency) {
        this.frequency = frequency;
    }

    public String getTest() {
        return test;
    }

    public void setTest(String test) {
        this.test = test;
    }

    public List<Session> getSessions() {
        return sessions;
    }

    public void setSessions(List<Session> sessions) {
        this.sessions = sessions;
    }
}
