import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.apiUrlBase}/auth`;
  private tokenKey = 'jwt_token';
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.loggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {}

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  login(email: string, password: string): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response) => {
          if (response.data.token) {
            localStorage.setItem(this.tokenKey, response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.loggedInSubject.next(true);
          }
        })
      );
  }

  register(
    name: string,
    email: string,
    password: string,
    age: number
  ): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, { name, email, password, age })
      .pipe(
        tap((response) => {
          if (response.data.token) {
            localStorage.setItem(this.tokenKey, response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            this.loggedInSubject.next(true);
          }
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('user');
    this.loggedInSubject.next(false); 
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
