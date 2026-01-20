// src/main/java/com/echo/app/controller/NoteController.java

package com.echo.app.controller;

import com.echo.app.dto.CreateNoteRequest;
import com.echo.app.dto.NoteResponse;
import com.echo.app.dto.PagedResponse;
import com.echo.app.service.NoteService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for note operations.
 */
@RestController
@RequestMapping("/api/v1/notes")
public class NoteController {

  private final NoteService noteService;

  public NoteController(NoteService noteService) {
    this.noteService = noteService;
  }

  /**
   * Lists notes with pagination.
   *
   * @param page the page number (default 0)
   * @param size the page size (default 20, max 100)
   * @param sort the sort field and direction (e.g., "createdAt,desc")
   * @return paginated list of notes
   */
  @GetMapping
  public ResponseEntity<PagedResponse<NoteResponse>> listNotes(
    @RequestParam(defaultValue = "0") int page,
    @RequestParam(defaultValue = "20") int size,
    @RequestParam(defaultValue = "createdAt,desc") String sort
  ) {
    String[] sortParts = sort.split(",");
    String sortField = sortParts[0];
    String sortDirection = sortParts.length > 1 ? sortParts[1] : "desc";

    PagedResponse<NoteResponse> response = noteService.getNotes(
      page,
      size,
      sortField,
      sortDirection
    );
    return ResponseEntity.ok(response);
  }

  /**
   * Creates a new note.
   *
   * @param request     the create note request
   * @param httpRequest the HTTP request for extracting client info
   * @return the created note
   */
  @PostMapping
  public ResponseEntity<NoteResponse> createNote(
    @Valid @RequestBody CreateNoteRequest request,
    HttpServletRequest httpRequest
  ) {
    String clientIp = getClientIp(httpRequest);
    String userAgent = httpRequest.getHeader("User-Agent");

    NoteResponse response = noteService.createNote(
      request,
      clientIp,
      userAgent
    );
    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  /**
   * Gets a single note by ID.
   *
   * @param id the note ID
   * @return the note if found
   */
  @GetMapping("/{id}")
  public ResponseEntity<NoteResponse> getNoteById(@PathVariable String id) {
    return noteService
      .getNoteById(id)
      .map(ResponseEntity::ok)
      .orElse(ResponseEntity.notFound().build());
  }

  private String getClientIp(HttpServletRequest request) {
    String xForwardedFor = request.getHeader("X-Forwarded-For");
    if (xForwardedFor != null && !xForwardedFor.isEmpty()) {
      return xForwardedFor.split(",")[0].trim();
    }
    return request.getRemoteAddr();
  }
}
