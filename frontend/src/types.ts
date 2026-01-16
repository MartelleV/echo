// src/types.ts

export interface Note {
  id: string;
  message: string;
  author: string | null;
  createdAt: string;
}

export interface PagedResponse<T> {
  page: number;
  size: number;
  totalPages: number;
  totalItems: number;
  items: T[];
}

export interface CreateNoteRequest {
  message: string;
  author?: string;
}

export interface ApiError {
  timestamp: string;
  status: number;
  error: string;
  message: string;
  path: string;
}
