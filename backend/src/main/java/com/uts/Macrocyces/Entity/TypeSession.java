package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDate;
import java.util.Date;

@Document(collection = "type_session")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TypeSession {

    @MongoId
    private String id;

    private String name;
    private LocalDate date;
    private int sportmansNumber;
    private String category;
    private String place;
    private String trainner;
    private String material;
    private String objectiveTecnial;
    private String objectivePhysical;
    private String objectiveEducational;

    @DBRef
    private StageSession stageSession;


    public TypeSession() {
    }

    public TypeSession(String name, LocalDate date, int sportmansNumber, String category, String place, String trainner, String material, String objectiveTecnial, String objectivePhysical, String objectiveEducational, StageSession stageSession) {
        this.name = name;
        this.date = date;
        this.sportmansNumber = sportmansNumber;
        this.category = category;
        this.place = place;
        this.trainner = trainner;
        this.material = material;
        this.objectiveTecnial = objectiveTecnial;
        this.objectivePhysical = objectivePhysical;
        this.objectiveEducational = objectiveEducational;
        this.stageSession = stageSession;
    }

    public TypeSession(String id, String name, LocalDate date, int sportmansNumber, String category, String place, String trainner, String material, String objectiveTecnial, String objectivePhysical, String objectiveEducational, StageSession stageSession) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.sportmansNumber = sportmansNumber;
        this.category = category;
        this.place = place;
        this.trainner = trainner;
        this.material = material;
        this.objectiveTecnial = objectiveTecnial;
        this.objectivePhysical = objectivePhysical;
        this.objectiveEducational = objectiveEducational;
        this.stageSession = stageSession;
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

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public int getSportmansNumber() {
        return sportmansNumber;
    }

    public void setSportmansNumber(int sportmansNumber) {
        this.sportmansNumber = sportmansNumber;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public String getPlace() {
        return place;
    }

    public void setPlace(String place) {
        this.place = place;
    }

    public String getTrainner() {
        return trainner;
    }

    public void setTrainner(String trainner) {
        this.trainner = trainner;
    }

    public String getMaterial() {
        return material;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public String getObjectiveTecnial() {
        return objectiveTecnial;
    }

    public void setObjectiveTecnial(String objectiveTecnial) {
        this.objectiveTecnial = objectiveTecnial;
    }

    public String getObjectivePhysical() {
        return objectivePhysical;
    }

    public void setObjectivePhysical(String objectivePhysical) {
        this.objectivePhysical = objectivePhysical;
    }

    public String getObjectiveEducational() {
        return objectiveEducational;
    }

    public void setObjectiveEducational(String objectiveEducational) {
        this.objectiveEducational = objectiveEducational;
    }

    public StageSession getStageSession() {
        return stageSession;
    }

    public void setStageSession(StageSession stageSession) {
        this.stageSession = stageSession;
    }
}
