// src/main/java/com/echo/app/dto/PagedResponse.java

package com.echo.app.dto;

import java.util.List;

/**
 * Generic paginated response DTO.
 *
 * @param <T> the type of items in the response
 */
public class PagedResponse<T> {

  private int page;
  private int size;
  private int totalPages;
  private long totalItems;
  private List<T> items;

  public PagedResponse() {}

  public PagedResponse(
    int page,
    int size,
    int totalPages,
    long totalItems,
    List<T> items
  ) {
    this.page = page;
    this.size = size;
    this.totalPages = totalPages;
    this.totalItems = totalItems;
    this.items = items;
  }

  public int getPage() {
    return page;
  }

  public void setPage(int page) {
    this.page = page;
  }

  public int getSize() {
    return size;
  }

  public void setSize(int size) {
    this.size = size;
  }

  public int getTotalPages() {
    return totalPages;
  }

  public void setTotalPages(int totalPages) {
    this.totalPages = totalPages;
  }

  public long getTotalItems() {
    return totalItems;
  }

  public void setTotalItems(long totalItems) {
    this.totalItems = totalItems;
  }

  public List<T> getItems() {
    return items;
  }

  public void setItems(List<T> items) {
    this.items = items;
  }
}
