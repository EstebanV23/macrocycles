package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;

@Document(collection = "type_mesocycles")
@JsonIgnoreProperties(ignoreUnknown = true)
public class TypeMesocycle {

    @MongoId
    private String id;
    private String name;

    @DBRef
    private List<Mesocycle> mesocycles;

    public TypeMesocycle() {
    }

    public TypeMesocycle(String name) {
        this.name = name;
    }

    public TypeMesocycle(String id, String name) {
        this.id = id;
        this.name = name;
    }

    public TypeMesocycle(String id, String name, List<Mesocycle> mesocycles) {
        this.id = id;
        this.name = name;
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

    public List<Mesocycle> getMesocycles() {
        return mesocycles;
    }

    public void setMesocycles(List<Mesocycle> mesocycles) {
        this.mesocycles = mesocycles;
    }
}
