package com.vivek08v.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivek08v.server.model.MenuItem;
import com.vivek08v.server.repo.MenuItemRepo;
import com.vivek08v.server.utils.JwtUtil;


@RestController
@RequestMapping("/api/v1/manage-menu")
public class MenuItemController {
    
    @Autowired
    MenuItemRepo menuItemRepo;

    @Autowired
    JwtUtil jwtUtil;

    @GetMapping("/menu-details")
    public ResponseEntity<?> getAllMenuItemsDetails(){

        List<MenuItem> allmenuList = menuItemRepo.findAllMenuItemDetails();
        return ResponseEntity.status(HttpStatus.OK).body(new MenuItemResponse(allmenuList, true));
    }
}


class MenuItemResponse{
    private List<MenuItem> allMenuItems;
    private Boolean success;

    public MenuItemResponse(){}
    public MenuItemResponse(List<MenuItem> allMenuItems, Boolean success){
        this.allMenuItems = allMenuItems;
        this.success = success;
    }

    public List<MenuItem> getAllMenuItems(){
        return this.allMenuItems;
    }
    public void setAllMenuItems(List<MenuItem> allMenuItems){
        this.allMenuItems = allMenuItems;
    }

    public Boolean getSuccess(){
        return this.success;
    }
    public void setSuccess(Boolean success){
        this.success = success;
    }
}