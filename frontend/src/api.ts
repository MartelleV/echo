// src/api.ts
import { Note, PagedResponse, CreateNoteRequest, ApiError } from './types';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getNotes(page = 0, size = 20): Promise<PagedResponse<Note>> {
    const response = await fetch(
      `${this.baseUrl}/api/v1/notes?page=${page}&size=${size}&sort=createdAt,desc`
    );
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }

  async createNote(request: CreateNoteRequest): Promise<Note> {
    const response = await fetch(`${this.baseUrl}/api/v1/notes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });
    if (!response.ok) {
      const error: ApiError = await response.json();
      throw new Error(error.message);
    }
    return response.json();
  }
}

export const api = new ApiClient(API_BASE_URL);
