package com.uts.Macrocyces.Entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

@Document(collection = "mesocycles")
@JsonIgnoreProperties(ignoreUnknown = true)
public class Mesocycle {
    @MongoId
    private  String id;
    @DBRef
    private TypeMesocycle typeMesocycle;

    public Mesocycle() {
    }

    public Mesocycle(TypeMesocycle typeMesocycle) {
        this.typeMesocycle = typeMesocycle;
    }

    public Mesocycle(String id, TypeMesocycle typeMesocycle) {
        this.id = id;
        this.typeMesocycle = typeMesocycle;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public TypeMesocycle getTypeMicrocycle() {
        return typeMesocycle;
    }

    public void setTypeMicrocycle(TypeMesocycle typeMesocycle) {
        this.typeMesocycle = typeMesocycle;
    }
}
