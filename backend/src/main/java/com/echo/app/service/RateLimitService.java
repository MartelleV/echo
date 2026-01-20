// src/main/java/com/echo/app/service/RateLimitService.java

package com.echo.app.service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

/**
 * Rate limiting service using Bucket4j with in-memory token buckets per IP
 * hash.
 */
@Service
public class RateLimitService {

  private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();
  private final int limitPerMinute;

  public RateLimitService(
    @Value("${echo.rate-limit-per-minute:5}") int limitPerMinute
  ) {
    this.limitPerMinute = limitPerMinute;
  }

  /**
   * Attempts to consume a token for the given key.
   *
   * @param key the rate limit key (typically IP hash)
   * @return true if token was consumed, false if rate limit exceeded
   */
  public boolean tryConsume(String key) {
    Bucket bucket = buckets.computeIfAbsent(key, this::createBucket);
    return bucket.tryConsume(1);
  }

  private Bucket createBucket(String key) {
    Bandwidth limit = Bandwidth.builder()
      .capacity(limitPerMinute)
      .refillGreedy(limitPerMinute, Duration.ofMinutes(1))
      .build();
    return Bucket.builder().addLimit(limit).build();
  }
}
