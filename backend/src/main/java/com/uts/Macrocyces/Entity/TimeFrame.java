package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;

@Document(collection = "time_frame")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TimeFrame {

    @MongoId
    private String id;
    private String type;

    private LocalDate start_date;
    private LocalDate end_date;


    public TimeFrame() {
    }

    public TimeFrame(String type, LocalDate start_date, LocalDate end_date) {
        this.type = type;
        this.start_date = start_date;
        this.end_date = end_date;
    }

    public TimeFrame(String id, String type, LocalDate start_date, LocalDate end_date) {
        this.id = id;
        this.type = type;
        this.start_date = start_date;
        this.end_date = end_date;
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
}
