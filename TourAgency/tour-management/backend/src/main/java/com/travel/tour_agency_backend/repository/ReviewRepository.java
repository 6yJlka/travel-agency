package com.travel.tour_agency_backend.repository;

import com.travel.tour_agency_backend.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Дополнительные методы можно добавить здесь
}