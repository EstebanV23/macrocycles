package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "sessions")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Session {
    @MongoId
    private String id;
    private LocalDateTime date;
    private int sessionNumber;
    private int amountSportsmans;
    private String category;
    private String place;
    private String trainner;
    private List<String> material;
    private String objectiveTec;
    private String objectivePhysical;
    private String objectiveEducational;
    @DBRef
    private List<SessionStage> stages;

    public Session() {
    }

    public Session(LocalDateTime date, int sessionNumber, int amountSportsmans, String category, String place, String trainner, List<String> material, String objectiveTec, String objectivePhysical, String objectiveEducational, List<SessionStage> stages) {
        this.date = date;
        this.sessionNumber = sessionNumber;
        this.amountSportsmans = amountSportsmans;
        this.category = category;
        this.place = place;
        this.trainner = trainner;
        this.material = material;
        this.objectiveTec = objectiveTec;
        this.objectivePhysical = objectivePhysical;
        this.objectiveEducational = objectiveEducational;
        this.stages = stages;
    }

    public Session(String id, LocalDateTime date, int sessionNumber, int amountSportsmans, String category, String place, String trainner, List<String> material, String objectiveTec, String objectivePhysical, String objectiveEducational, List<SessionStage> stages) {
        this.id = id;
        this.date = date;
        this.sessionNumber = sessionNumber;
        this.amountSportsmans = amountSportsmans;
        this.category = category;
        this.place = place;
        this.trainner = trainner;
        this.material = material;
        this.objectiveTec = objectiveTec;
        this.objectivePhysical = objectivePhysical;
        this.objectiveEducational = objectiveEducational;
        this.stages = stages;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public int getSessionNumber() {
        return sessionNumber;
    }

    public void setSessionNumber(int sessionNumber) {
        this.sessionNumber = sessionNumber;
    }

    public int getAmountSportsmans() {
        return amountSportsmans;
    }

    public void setAmountSportsmans(int amountSportsmans) {
        this.amountSportsmans = amountSportsmans;
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

    public List<String> getMaterial() {
        return material;
    }

    public void setMaterial(List<String> material) {
        this.material = material;
    }

    public String getObjectiveTec() {
        return objectiveTec;
    }

    public void setObjectiveTec(String objectiveTec) {
        this.objectiveTec = objectiveTec;
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

    public List<SessionStage> getStages() {
        return stages;
    }

    public void setStages(List<SessionStage> stages) {
        this.stages = stages;
    }
}
