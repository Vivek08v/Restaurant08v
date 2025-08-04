package com.vivek08v.server.model;

import java.time.LocalDate;
import java.time.LocalTime;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class TableBooking {
    private Integer id;
    private Integer userId;
    private Integer noOfSeats;
    private LocalDate Date;
    private LocalTime Time;
    private String status;

    public TableBooking(){}

    public TableBooking(Integer userId, Integer noOfPeople, LocalDate Date, LocalTime Time, String status){
        this.userId = userId;
        this.noOfSeats = noOfPeople;
        this.Date = Date;
        this.Time = Time;
        this.status = status;
    }

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

    public Integer getNoOfSeats() {
        return noOfSeats;
    }

    public void setNoOfSeats(Integer noOfSeats) {
        this.noOfSeats = noOfSeats;
    }

    public LocalDate getDate() {
        return Date;
    }

    public void setDate(LocalDate Date) {
        this.Date = Date;
    }

    public LocalTime getTime() {
        return Time;
    }

    public void setTime(LocalTime Time) {
        this.Time = Time;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "TableBooking{" +
                "id=" + id +
                ", userId=" + userId +
                ", noOfSeats=" + noOfSeats +
                ", date=" + Date +
                ", time=" + Time +
                ", status='" + status + '\'' +
                '}';
    }
}