// src/main/java/com/echo/app/dto/CreateNoteRequest.java

package com.echo.app.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * DTO for creating a new note.
 */
public class CreateNoteRequest {

    @NotBlank(message = "message is required")
    @Size(min = 1, max = 1000, message = "message must be between 1 and 1000 characters")
    private String message;

    @Size(max = 100, message = "author must be at most 100 characters")
    private String author;

    public CreateNoteRequest() {
    }

    public CreateNoteRequest(String message, String author) {
        this.message = message;
        this.author = author;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }
}
