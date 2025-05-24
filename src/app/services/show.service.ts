import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Show {
  show_id: string;
  type: string;
  title: string;
  director: string;
  cast: string[];
  country: string;
  release_year: number;
  rating: string;
  duration: string;
  listed_in: string[];
  description: string;
}

interface PaginatedResponse {
  status: number;
  message: string;
  data: {
    shows: Show[];
    page: number;
    pages: number;
    total: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class ShowService {
  private apiUrl = 'http://localhost:5000/api/shows';

  constructor(private http: HttpClient) {}

  getShows(
    page: number,
    limit: number,
    type?: string
  ): Observable<PaginatedResponse> {
    const params: any = { page: page.toString(), limit: limit.toString() };
    if (type) {
      params.type = type;
    }
    return this.http.get<PaginatedResponse>(this.apiUrl, { params });
  }

  searchShows(
    query: string,
    page: number,
    limit: number
  ): Observable<PaginatedResponse> {
    const params = { query, page: page.toString(), limit: limit.toString() };
    return this.http.get<PaginatedResponse>(`${this.apiUrl}/search`, {
      params,
    });
  }

  getShowById(id: string): Observable<Show> {
    return this.http.get<Show>(`${this.apiUrl}/${id}`);
  }
}
