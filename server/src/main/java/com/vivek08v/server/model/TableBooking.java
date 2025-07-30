package com.vivek08v.server.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@Scope("prototype")
public class TableBooking {
    private Integer id;
    private Integer userId;
    private Integer numberOfPeople;
    private LocalDateTime dateTime;
    private String status;

    public TableBooking(){}

    public TableBooking(Integer id, Integer userId, Integer numberOfPeople, LocalDateTime dateTime, String status){
        this.id = id;
        this.userId = userId;
        this.numberOfPeople = numberOfPeople;
        this.dateTime = dateTime;
        this.status = status;
    }

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getNumberOfPeople() {
        return numberOfPeople;
    }

    public void setNumberOfPeople(Integer numberOfPeople) {
        this.numberOfPeople = numberOfPeople;
    }

    public LocalDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(LocalDateTime dateTime) {
        this.dateTime = dateTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    // Optional: toString() method for better logging/debugging
    @Override
    public String toString() {
        return "TableBooking{" +
                "id=" + id +
                ", userId=" + userId +
                ", numberOfPeople=" + numberOfPeople +
                ", dateTime=" + dateTime +
                ", status='" + status + '\'' +
                '}';
    }
}