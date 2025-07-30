package com.vivek08v.server.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vivek08v.server.model.TableBooking;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/v1")
public class TableBookController {

    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd hh:mm a");

    @GetMapping("/all-bookings")
    public Map<String, Object> getAllBookings() {
        System.out.println("hi, server reached...");
        try{
            List<TableBooking> bookings = List.of(
                new TableBooking(101,101,2, LocalDateTime.parse("2025-08-01 10:00 AM", formatter), "done"),
                new TableBooking(102,101,4, LocalDateTime.parse("2025-08-01 10:00 AM", formatter), "not-done")
            );
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Bookings fetched successfully");
            response.put("bookings", bookings);
            return response;
        }
        catch(Exception e){
            System.out.println("error>>> " + e);
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Error fetching bookings");
            errorResponse.put("error", e.getMessage());
            return errorResponse;
        }
    }
}
