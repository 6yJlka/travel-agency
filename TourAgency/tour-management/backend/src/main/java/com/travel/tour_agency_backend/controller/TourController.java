package com.travel.tour_agency_backend.controller;

import com.travel.tour_agency_backend.entity.Tour;
import com.travel.tour_agency_backend.entity.Review;
import com.travel.tour_agency_backend.service.TourService;
import com.travel.tour_agency_backend.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.travel.tour_agency_backend.security.JwtTokenProvider;
import java.util.List;
import java.util.Optional;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/tours")
public class TourController {

    private final TourService tourService;
    @Autowired
    private  ReviewService reviewService;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    public TourController(TourService tourService) {
        this.tourService = tourService;
    }

    @GetMapping
    public List<Tour> getAllTours() {
        return tourService.getAllTours();
    }

    @GetMapping("/{id}")
    public Optional<Tour> getTourById(@PathVariable Long id) {
        return tourService.getTourById(id);
    }

    @PostMapping
    public ResponseEntity<?> createTour(@RequestHeader("Authorization") String authHeader, @RequestBody Tour tour) {
        try {
            String token = authHeader.substring(7); // "Bearer "
            if (tokenProvider.validateToken(token)) { // !!! Проверка токена
                String username = tokenProvider.getUsernameFromJWT(token); // !!! Получение имени пользователя из токена
                if ("admin".equals(username)) { // !!! Проверка на admin
                    return ResponseEntity.ok(tourService.createTour(tour));
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Only admin can create tours"); // !!!  Доступ запрещен
                }
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid token");
            }

        }catch (Exception exception) {
            return ResponseEntity.badRequest().body("Failed to create a tour" + exception.getMessage());

        }


    }

    @PutMapping("/{id}")
    public Tour updateTour(@PathVariable Long id, @RequestBody Tour tour) {
        return tourService.updateTour(id, tour);
    }

    @DeleteMapping("/{id}")
    public void deleteTour(@PathVariable Long id) {
        tourService.deleteTour(id);
    }



    @GetMapping("/{tourId}/reviews") // !!!  Измененный endpoint
    public ResponseEntity<List<Review>> getReviewsByTourId(@PathVariable Long tourId) { // !!! Возвращаем List<Review>
        try {
            List<Review> reviews = reviewService.getReviewsByTourId(tourId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build(); // !!! Обработка ошибок
        }
    }


}
