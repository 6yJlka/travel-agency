package com.travel.tour_agency_backend;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
    @GetMapping("/hello")
    String hello_world(){
        return "hello world!";
    }
}

