// src/main/java/com/echo/app/dto/NoteResponse.java

package com.echo.app.dto;

import com.echo.app.model.Note;
import java.time.Instant;

/**
 * DTO for note responses.
 */
public class NoteResponse {

    private String id;
    private String message;
    private String author;
    private Instant createdAt;

    public NoteResponse() {
    }

    public NoteResponse(String id, String message, String author, Instant createdAt) {
        this.id = id;
        this.message = message;
        this.author = author;
        this.createdAt = createdAt;
    }

    /**
     * Creates a NoteResponse from a Note entity.
     *
     * @param note the note entity
     * @return the response DTO
     */
    public static NoteResponse fromEntity(Note note) {
        return new NoteResponse(
                note.getId(), note.getMessage(), note.getAuthor(), note.getCreatedAt());
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }
}
