import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

interface AuthResponse {
  status: number;
  message: string;
  data: { token: string; user: { email: string; age: number } };
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000/api/auth';
  private tokenKey = 'jwt_token';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.data.token) {
            localStorage.setItem(this.tokenKey, response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    age: number
  ): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, {name, email, password, age })
      .pipe(
        tap((response) => {
          if (response.data.token) {
            localStorage.setItem(this.tokenKey, response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUser(): { name: string, email: string; age: number } | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
