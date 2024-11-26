package com.travel.tour_agency_backend.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")
@Data
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "tour_id", referencedColumnName = "id", nullable = false)
    private Tour tour;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id", nullable = false)
    private User user;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "booking_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    private LocalDateTime bookingDate;

    @Column(nullable = false)
    private Integer numPeople;

    @Column(name = "total_price", nullable = false)
    private BigDecimal totalPrice;

    @Column(name = "full_name", nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String phone;

    //вот тут какая-то хуйня, нужно как-то фиксить,из-за этого оно не хочет добавляться в бд
    @Column(name = "book_at", nullable = false)
    private String bookAt;

    @PrePersist
    public void prePersist() {
        this.bookingDate = LocalDateTime.now();
    }
}