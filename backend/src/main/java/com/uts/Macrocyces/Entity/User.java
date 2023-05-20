package com.uts.Macrocyces.Entity;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.uts.Macrocyces.Crypto.AESCryptoUtil;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.MongoId;


@Document(collection = "user")
@JsonIgnoreProperties(ignoreUnknown = true)
public class User {

    @MongoId
    private String id;
    private String name;
    private String surname;
    private String email;
    private String password;

    public User() {
    }

    public User(String name, String surname, String email, String password) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }

    public User(String id, String name, String surname, String email, String password) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
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

    public void setPassword(String password) throws Exception {
        this.password = AESCryptoUtil.encrypt(password);
    }

    public String getPassword() throws Exception {
        return AESCryptoUtil.decrypt(password);
    }

}