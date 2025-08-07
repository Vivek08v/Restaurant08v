package com.vivek08v.server.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.vivek08v.server.model.MenuItem;
import com.vivek08v.server.repo.MenuItemRepo;
import com.vivek08v.server.utils.CloudinaryService;
import com.vivek08v.server.utils.JwtUtil;



@RestController
@RequestMapping("/api/v1/manage-menu")
public class MenuItemController {

    private final MenuItem menuItem;
    
    @Autowired
    MenuItemRepo menuItemRepo;

    @Autowired
    JwtUtil jwtUtil;

    @Autowired
    CloudinaryService cloudinaryService;

    MenuItemController(MenuItem menuItem) {
        this.menuItem = menuItem;
    }

    @GetMapping("/menu-details")
    public ResponseEntity<?> getAllMenuItemsDetails(){

        List<MenuItem> allmenuList = menuItemRepo.findAllMenuItemDetails();
        return ResponseEntity.status(HttpStatus.OK).body(new MenuListResponse(allmenuList, true));
    }

    @PatchMapping("/edit-menu-details")
    public ResponseEntity<?> editMenuDetails(@RequestBody MenuItem request) {
        System.out.println("Reached controller");
        try {
            if(request.getId()==null || request.getPrice()==null || request.getQuantity()==null){
                return ResponseEntity.badRequest().body("Missing request values, id or price or quantity");
            }

            MenuItem menuItem = menuItemRepo.manageMenu(request);
            return ResponseEntity.status(HttpStatus.OK).body(new MenuItemResponse(menuItem, true));
        } catch (Exception e) {
            System.out.println("Error in edit-menu-details"+ e);
        }
        return ResponseEntity.internalServerError().body("Menu Updation failed");
    }

    @PostMapping(value = "/add-menu-details", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> addNewMenuDetails( @RequestPart("data") MenuItem data,
                                                @RequestPart("image") MultipartFile image)
    {
        System.out.println("Reached controller"+ data);
        System.out.println("1");
        try {
            System.out.println("2");
            if(data.getName()==null || data.getPrice()==null || data.getQuantity()==null){
                System.out.println("3");
                return ResponseEntity.badRequest().body("Missing request values, id or price or quantity");
            }
            System.out.println("4");

            String imageUrl = null;
            if(image!=null){
                imageUrl = cloudinaryService.uploadFile(image);
            }
            System.out.println(imageUrl);
            data.setImageUrl(imageUrl);
            System.out.println(data.getImageUrl());
            MenuItem menuItem = menuItemRepo.addNewItemMenu(data);

            return ResponseEntity.status(HttpStatus.OK).body(new MenuItemResponse(menuItem, true));
        } catch (Exception e) {
            System.out.println("Error in edit-menu-details"+ e);
        }
        return ResponseEntity.internalServerError().body("Menu Updation failed");
    }
    
}

class MenuItemResponse{
    private MenuItem menuItem;
    private Boolean success;

    public MenuItemResponse(){}
    public MenuItemResponse(MenuItem menuItem, Boolean success){
        this.menuItem = menuItem;
        this.success = success;
    }

    public MenuItem getMenuItem(){
        return this.menuItem;
    }
    public void setMenuItem(MenuItem menuItem){
        this.menuItem = menuItem;
    }

    public Boolean getSuccess(){
        return this.success;
    }
    public void setSuccess(Boolean success){
        this.success = success;
    }
}

class MenuListResponse{
    private List<MenuItem> allMenuItems;
    private Boolean success;

    public MenuListResponse(){}
    public MenuListResponse(List<MenuItem> allMenuItems, Boolean success){
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


class MenuRequest {
    private Integer id;
    private String name;
    private String category;
    private Integer quantity;
    private Float price;
    private Boolean isVeg;

    public MenuRequest() {}

    public MenuRequest(Integer id, String name, String category, Integer quantity, Float price, Boolean isVeg) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.quantity = quantity;
        this.price = price;
        this.isVeg = isVeg;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName(){
        return this.name;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getCategory(){
        return this.name;
    }

    public void setCategory(String category){
        this.category = category;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Float getPrice() {
        return price;
    }

    public void setPrice(Float price) {
        this.price = price;
    }

    public Boolean getIsVeg(){
        return this.isVeg;
    }

    public void setIsVeg(Boolean isVeg){
        this.isVeg = isVeg;
    }
}
