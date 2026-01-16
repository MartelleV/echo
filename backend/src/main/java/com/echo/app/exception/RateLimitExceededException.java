// src/main/java/com/echo/app/exception/RateLimitExceededException.java

package com.echo.app.exception;

/**
 * Exception thrown when rate limit is exceeded.
 */
public class RateLimitExceededException extends RuntimeException {

    public RateLimitExceededException(String message) {
        super(message);
    }
}
