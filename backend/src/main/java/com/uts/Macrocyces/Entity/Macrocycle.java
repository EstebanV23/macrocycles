package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.List;

@Document(collection = "macrocycle")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Macrocycle {
    @MongoId
    private String id;
    private String name;
    private LocalDate start_date;
    private LocalDate end_date;

    @DBRef
    private List<TimeFrame> time_frame;

    @DBRef
    private List<Stage> stages;

    @DBRef
    private List<Mesocycle> mesocycles;


    public Macrocycle() {
    }

    public Macrocycle(String name, LocalDate start_date, LocalDate end_date, List<TimeFrame> time_frame, List<Stage> stages, List<Mesocycle> mesocycles) {
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.time_frame = time_frame;
        this.stages = stages;
        this.mesocycles = mesocycles;
    }

    public Macrocycle(String id, String name, LocalDate start_date, LocalDate end_date, List<TimeFrame> time_frame, List<Stage> stages, List<Mesocycle> mesocycles) {
        this.id = id;
        this.name = name;
        this.start_date = start_date;
        this.end_date = end_date;
        this.time_frame = time_frame;
        this.stages = stages;
        this.mesocycles = mesocycles;
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

    public LocalDate getStart_date() {
        return start_date;
    }

    public void setStart_date(LocalDate start_date) {
        this.start_date = start_date;
    }

    public LocalDate getEnd_date() {
        return end_date;
    }

    public void setEnd_date(LocalDate end_date) {
        this.end_date = end_date;
    }

    public List<TimeFrame> getTime_frame() {
        return time_frame;
    }

    public void setTime_frame(List<TimeFrame> time_frame) {
        this.time_frame = time_frame;
    }

    public List<Stage> getStages() {
        return stages;
    }

    public void setStages(List<Stage> stages) {
        this.stages = stages;
    }

    public List<Mesocycle> getMesocycles() {
        return mesocycles;
    }

    public void setMesocycles(List<Mesocycle> mesocycles) {
        this.mesocycles = mesocycles;
    }
}
