import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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

  constructor(private http: HttpClient, private authService: AuthService) {}

  getShows(
    page: number,
    limit: number,
    type?: string
  ): Observable<PaginatedResponse> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.authService.getToken()}`,
    });
    const params: any = { page: page.toString(), limit: limit.toString() };
    if (type) {
      params.type = type;
    }
    return this.http.get<PaginatedResponse>(this.apiUrl, { headers, params });
  }
}
