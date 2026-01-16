// src/main/java/com/echo/app/repository/NoteRepository.java

package com.echo.app.repository;

import com.echo.app.model.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data MongoDB repository for Note documents.
 */
@Repository
public interface NoteRepository extends MongoRepository<Note, String> {
}
