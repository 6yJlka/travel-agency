package com.travel.tour_agency_backend.service;

import com.travel.tour_agency_backend.entity.Tour;
import com.travel.tour_agency_backend.repository.TourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TourService {

    private final TourRepository tourRepository;

    @Autowired
    public TourService(TourRepository tourRepository) {
        this.tourRepository = tourRepository;
    }

    // Получение всех туров
    public List<Tour> getAllTours() {
        return tourRepository.findAll();
    }

    // Получение тура по id
    public Optional<Tour> getTourById(Long id) {
        return tourRepository.findById(id);
    }

    // Создание нового тура
    public Tour createTour(Tour tour) {
        return tourRepository.save(tour);
    }

    // Обновление данных тура
    public Tour updateTour(Long id, Tour tour) {
        Optional<Tour> existingTour = tourRepository.findById(id);
        if (existingTour.isPresent()) {
            tour.setId(id);  // Обновляем id
            return tourRepository.save(tour);
        }
        return null;  // Можно выбросить исключение, если тур не найден
    }

    // Удаление тура
    public void deleteTour(Long id) {
        tourRepository.deleteById(id);
    }
}