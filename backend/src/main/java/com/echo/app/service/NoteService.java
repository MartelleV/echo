// src/main/java/com/echo/app/service/NoteService.java

package com.echo.app.service;

import com.echo.app.dto.CreateNoteRequest;
import com.echo.app.dto.NoteResponse;
import com.echo.app.dto.PagedResponse;
import com.echo.app.exception.RateLimitExceededException;
import com.echo.app.model.Note;
import com.echo.app.model.NoteMeta;
import com.echo.app.repository.NoteRepository;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.HexFormat;
import java.util.List;
import java.util.Optional;
import org.jsoup.Jsoup;
import org.jsoup.safety.Safelist;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

/**
 * Service layer for note operations including validation, sanitization, and
 * rate limiting.
 */
@Service
public class NoteService {

  private static final Logger log = LoggerFactory.getLogger(NoteService.class);

  private final NoteRepository noteRepository;
  private final RateLimitService rateLimitService;
  private final String ipSalt;

  public NoteService(
    NoteRepository noteRepository,
    RateLimitService rateLimitService,
    @Value("${echo.ip-salt}") String ipSalt
  ) {
    this.noteRepository = noteRepository;
    this.rateLimitService = rateLimitService;
    this.ipSalt = ipSalt;
  }

  /**
   * Retrieves a paginated list of notes.
   *
   * @param page          the page number (0-indexed)
   * @param size          the page size (max 100)
   * @param sortField     the field to sort by
   * @param sortDirection the sort direction (asc/desc)
   * @return paginated response of notes
   */
  public PagedResponse<NoteResponse> getNotes(
    int page,
    int size,
    String sortField,
    String sortDirection
  ) {
    int clampedSize = Math.min(Math.max(size, 1), 100);
    Sort.Direction direction = "asc".equalsIgnoreCase(sortDirection)
      ? Sort.Direction.ASC
      : Sort.Direction.DESC;
    Pageable pageable = PageRequest.of(
      page,
      clampedSize,
      Sort.by(direction, sortField)
    );

    Page<Note> notePage = noteRepository.findAll(pageable);
    List<NoteResponse> items = notePage
      .getContent()
      .stream()
      .map(NoteResponse::fromEntity)
      .toList();

    return new PagedResponse<>(
      notePage.getNumber(),
      notePage.getSize(),
      notePage.getTotalPages(),
      notePage.getTotalElements(),
      items
    );
  }

  /**
   * Creates a new note with sanitization and rate limiting.
   *
   * @param request   the create note request
   * @param clientIp  the client IP address
   * @param userAgent the client user agent
   * @return the created note response
   * @throws RateLimitExceededException if rate limit is exceeded
   */
  public NoteResponse createNote(
    CreateNoteRequest request,
    String clientIp,
    String userAgent
  ) {
    String ipHash = hashIp(clientIp);

    if (!rateLimitService.tryConsume(ipHash)) {
      log.warn("Rate limit exceeded for ipHash: {}", ipHash);
      throw new RateLimitExceededException(
        "Rate limit exceeded. Please try again later."
      );
    }

    String sanitizedMessage = sanitize(request.getMessage());
    String sanitizedAuthor =
      request.getAuthor() != null ? sanitize(request.getAuthor().trim()) : null;

    if (sanitizedAuthor != null && sanitizedAuthor.isEmpty()) {
      sanitizedAuthor = null;
    }

    Note note = new Note();
    note.setMessage(sanitizedMessage);
    note.setAuthor(sanitizedAuthor);
    note.setCreatedAt(Instant.now());
    note.setIpHash(ipHash);
    note.setMeta(new NoteMeta(userAgent, null));

    Note saved = noteRepository.save(note);
    log.info("Created note with id: {}", saved.getId());

    return NoteResponse.fromEntity(saved);
  }

  /**
   * Retrieves a single note by ID.
   *
   * @param id the note ID
   * @return optional containing the note if found
   */
  @SuppressWarnings("null")
  public Optional<NoteResponse> getNoteById(String id) {
    return noteRepository.findById(id).map(NoteResponse::fromEntity);
  }

  private String sanitize(String input) {
    if (input == null) {
      return null;
    }
    return Jsoup.clean(input.trim(), Safelist.simpleText());
  }

  private String hashIp(String ip) {
    try {
      MessageDigest digest = MessageDigest.getInstance("SHA-256");
      String toHash = ip + ipSalt;
      byte[] hash = digest.digest(toHash.getBytes(StandardCharsets.UTF_8));
      return HexFormat.of().formatHex(hash);
    } catch (NoSuchAlgorithmException e) {
      throw new RuntimeException("SHA-256 not available", e);
    }
  }
}
