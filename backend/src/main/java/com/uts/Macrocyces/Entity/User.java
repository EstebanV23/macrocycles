package com.uts.Macrocyces.Entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;

import java.util.List;


@Document(collection = "user")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @MongoId
    private String id;
    private String name;
    private String surname;
    private String email;
    private String password;

    @DBRef
    private List<Macrocycle> macrocycles;

    public User() {
    }

    public User(String name, String surname, String email, String password, List<Macrocycle> macrocycles) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.macrocycles = macrocycles;
    }

    public User(String id, String name, String surname, String email, String password, List<Macrocycle> macrocycles) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.macrocycles = macrocycles;
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

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Macrocycle> getMacrocycles() {
        return macrocycles;
    }

    public void setMacrocycles(List<Macrocycle> macrocycles) {
        this.macrocycles = macrocycles;
    }
}