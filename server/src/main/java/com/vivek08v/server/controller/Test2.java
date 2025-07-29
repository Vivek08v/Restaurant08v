package com.vivek08v.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class Test2 {

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }
}
