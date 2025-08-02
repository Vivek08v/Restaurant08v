package com.vivek08v.server.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivek08v.server.model.TableBooking;
import com.vivek08v.server.repo.TableBookingRepo;
import com.vivek08v.server.utils.JwtUtil;
import com.vivek08v.server.utils.CustomUserDetails;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1")
public class TableBookController {

    @Autowired
    private TableBookingRepo tableBookingRepo;

    @Autowired
    private JwtUtil jwtUtil;

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");

    @GetMapping("/all-bookings")
    public void getAllBookings() {
        System.out.println("hi, server reached...");
        // try{
        //     List<TableBooking> bookings = List.of(
        //         new TableBooking(101,101,2, LocalDateTime.parse("2025-08-01 10:00 AM", formatter), "done"),
        //         new TableBooking(102,101,4, LocalDateTime.parse("2025-08-01 10:00 AM", formatter), "not-done")
        //     );
        //     Map<String, Object> response = new HashMap<>();
        //     response.put("success", true);
        //     response.put("message", "Bookings fetched successfully");
        //     response.put("bookings", bookings);
        //     return response;
        // }
        // catch(Exception e){
        //     System.out.println("error>>> " + e);
        //     Map<String, Object> errorResponse = new HashMap<>();
        //     errorResponse.put("success", false);
        //     errorResponse.put("message", "Error fetching bookings");
        //     errorResponse.put("error", e.getMessage());
        //     return errorResponse;
        // }
    }


    @PostMapping("/booking")
    public ResponseEntity<?> bookTable(@RequestBody BookingRequest request) {
        System.out.println("hi, /booking server reached...");
        try{
            if(request.getDate()==null || request.getTime()==null || request.getNoOfSeats()==null){
                System.out.println("request: "+request.toString());
                return ResponseEntity.badRequest().body("Missing Date or Slot or Seats");
            }

            // System.out.println("1");
            // Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            // String token = ((UsernamePasswordAuthenticationToken) auth).getCredentials().toString();

            // System.out.println("2");
            // String email = jwtUtil.extractUsername(token);
            // Integer userId = jwtUtil.extractUserId(token);
            // String role = jwtUtil.extractRole(token);

            Authentication auth = SecurityContextHolder.getContext().getAuthentication();
            CustomUserDetails user = (CustomUserDetails) auth.getPrincipal();
                    
            String email = user.getUsername();
            Integer userId = user.getId();
            String role = user.getRole();

            System.out.println("3");

            TableBooking tableBooking = new TableBooking();
            tableBooking.setUserId(userId);
            tableBooking.setNoOfPeople(request.getNoOfSeats());
            tableBooking.setDate(request.getDate());
            tableBooking.setTime(request.getTime());
            tableBooking.setStatus("Booked");

            TableBooking tabBookIns = tableBookingRepo.saveBooking(tableBooking);
            
            // String token = jwtUtil.generateToken(userIns.getEmail(), userIns.getId(), userIns.getRole());
            return ResponseEntity.status(HttpStatus.CREATED).body(new BookingResponse(tabBookIns, true));
        }
        catch(Exception e){
            System.out.println("Table Booking Error: " + e.getMessage());
            return ResponseEntity.internalServerError().body("Table Booking failed");
        }
    }
}

class BookingRequest{
    private LocalDate Date;
    private LocalTime Time; // or Slot
    private Integer noOfSeats;

    public BookingRequest() {}

    public BookingRequest(LocalDate Date, LocalTime Time, Integer noOfSeats){
        this.Date = Date;
        this.Time = Time;
        this.noOfSeats = noOfSeats;
    }


    public void setDate(LocalDate Date){
        this.Date = Date;
    }
    public LocalDate getDate(){
        return this.Date;
    }

    public void setTime(LocalTime Time){
        this.Time = Time;
    }
    public LocalTime getTime(){
        return this.Time;
    }

    public void setNoOfSeats(Integer noOfSeats){
        this.noOfSeats = noOfSeats;
    }
    public Integer getNoOfSeats(){
        return this.noOfSeats;
    }

    @Override
    public String toString(){
        return "User{" +
                " Date=" + Date +
                ", Time=" + Time +
                ", noOfSeats=" + noOfSeats +
                "}";
    }
}

class BookingResponse{
    private TableBooking tableBooking;
    private Boolean success;

    public BookingResponse(TableBooking tableBooking, Boolean success){
        this.tableBooking = tableBooking;
        this.success = success;
    }

    public TableBooking getBooking(){
        return tableBooking;
    }
    public void setBooking(){
        this.tableBooking = tableBooking;
    }

    public Boolean getSuccess(){
        return success;
    }
    public void setSuccess(){
        this.success = success;
    }
}
