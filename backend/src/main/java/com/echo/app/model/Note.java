// src/main/java/com/echo/app/model/Note.java

package com.echo.app.model;

import java.time.Instant;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

/**
 * MongoDB document representing a note.
 */
@Document(collection = "notes")
public class Note {

  @Id
  private String id;

  private String message;
  private String author;
  private Instant createdAt;
  private String ipHash;
  private NoteMeta meta;

  public Note() {}

  public Note(
    String message,
    String author,
    Instant createdAt,
    String ipHash,
    NoteMeta meta
  ) {
    this.message = message;
    this.author = author;
    this.createdAt = createdAt;
    this.ipHash = ipHash;
    this.meta = meta;
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

  public String getIpHash() {
    return ipHash;
  }

  public void setIpHash(String ipHash) {
    this.ipHash = ipHash;
  }

  public NoteMeta getMeta() {
    return meta;
  }

  public void setMeta(NoteMeta meta) {
    this.meta = meta;
  }
}
