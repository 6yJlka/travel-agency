package com.travel.tour_agency_backend.service;

import com.travel.tour_agency_backend.entity.Review;
import com.travel.tour_agency_backend.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    // Получение всех отзывов
    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    // Получение отзыва по id
    public Optional<Review> getReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    // Создание нового отзыва
    public Review createReview(Review review) {
        return reviewRepository.save(review);
    }

    // Обновление отзыва
    public Review updateReview(Long id, Review review) {
        Optional<Review> existingReview = reviewRepository.findById(id);
        if (existingReview.isPresent()) {
            review.setId(id);  // Обновляем id
            return reviewRepository.save(review);
        }
        return null;  // Можно выбросить исключение, если отзыв не найден
    }

    // Удаление отзыва
    public void deleteReview(Long id) {
        reviewRepository.deleteById(id);
    }
}