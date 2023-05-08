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

    private LocalDate start_date;
    private LocalDate  end_date;


    @DBRef
    private List<Mesocycle> mesocycle;




    public Microcycle() {
    }

    public Microcycle(LocalDate start_date, LocalDate end_date,  List<Mesocycle> mesocycle) {
        this.start_date = start_date;
        this.end_date = end_date;
        this.mesocycle = mesocycle;
    }

    public Microcycle(String id, LocalDate start_date, LocalDate end_date,  List<Mesocycle> mesocycle) {
        this.id = id;
        this.start_date = start_date;
        this.end_date = end_date;
        this.mesocycle = mesocycle;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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


    public List<Mesocycle> getMesocycle() {
        return mesocycle;
    }

    public void setMesocycle(List<Mesocycle> mesocycle) {
        this.mesocycle = mesocycle;
    }
}
