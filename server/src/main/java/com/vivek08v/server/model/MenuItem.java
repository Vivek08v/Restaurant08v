package com.vivek08v.server.model;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Component;

@Component
@Scope("prototype")
public class MenuItem {
    private Integer id;
    private String name;
    private Double price;
    private Integer quantity;
    private String category;
    private Boolean isVeg;

    public void setId(Integer id){
        this.id = id;
    }

    public Integer getId(){
        return this.id;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public void setPrice(Double price){
        this.price = price;
    }

    public Double getPrice(){
        return this.price;
    }

    public void setQuantity(Integer quantity){
        this.quantity = quantity;
    }

    public Integer getQuantity(){
        return this.quantity;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public String getCategory(){
        return this.category;
    }

    public void setIsVeg(Boolean isVeg){
        this.isVeg = isVeg;
    }

    public Boolean getIsVeg(){
        return isVeg;
    }
     
}
