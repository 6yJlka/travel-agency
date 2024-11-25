package com.travel.tour_agency_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "tours") // Указываем имя таблицы
@Data
public class Tour {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String title;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(length = 50)
    private String city;

    @Column(nullable = false)
    private BigDecimal price;

    @Column(name = "photo_url", length = 255)
    private String photoUrl;

    @Column(nullable = false)
    private Boolean featured = false;

    @JsonFormat(pattern = "yyyy-MM-dd") // Отображение только даты без времени
    @Column(name = "created_at", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime createdAt;

    @OneToMany(mappedBy = "tour", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Review> reviews = new ArrayList<>();

    @PrePersist
    public void prePersist() {
        // Устанавливаем текущую дату и время перед сохранением объекта
        this.createdAt = LocalDateTime.now();
    }

}