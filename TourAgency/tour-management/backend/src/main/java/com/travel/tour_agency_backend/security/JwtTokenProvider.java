package com.travel.tour_agency_backend.security;

import io.jsonwebtoken.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser; // Добавьте этот импорт
import io.jsonwebtoken.Jws;     // И этот
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.UnsupportedJwtException;

import io.jsonwebtoken.security.Keys;
import javax.crypto.SecretKey;
import jakarta.annotation.PostConstruct;

@Component
public class JwtTokenProvider {

    @Value("${jwt.secret}")
    private String jwtSecretString; // Теперь это String

    private SecretKey jwtSecret; // Ключ как SecretKey

    @Value("${jwt.expiration}") // Время жизни токена (в мс, добавьте в application.properties)
    private long jwtExpiration;

    @PostConstruct // Инициализация ключа после создания бина
    public void init() {
        this.jwtSecret = Keys.hmacShaKeyFor(jwtSecretString.getBytes());
    }

    public String generateToken(String email) {
        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + jwtExpiration);

        return Jwts.builder()
                .setSubject(email)
                .setIssuedAt(now)
                .setExpiration(expiryDate)
                .signWith(jwtSecret)
                .compact();
    }

    public String getEmailFromJWT(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(jwtSecret)
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(jwtSecret).build().parseClaimsJws(authToken);
            return true;
        } catch (MalformedJwtException ex) {
            //logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            //logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            //logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            //logger.error("JWT claims string is empty.");
        }
        return false;
    }
}