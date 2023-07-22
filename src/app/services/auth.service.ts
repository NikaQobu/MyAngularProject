import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ENVINROMENT } from 'src/environment/environment';
import { LoginCredentials, User } from '../types/user';
import { BehaviorSubject, catchError, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loading$ = new BehaviorSubject<boolean>(false);
  errorMsg$ = new BehaviorSubject<string>('');
  user$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient, private router: Router) {}

  baseUrl = ENVINROMENT.baseUrl;

  get loading() {
    return this.loading$.asObservable();
  }

  get errorMsg() {
    return this.errorMsg$.asObservable();
  }

  get user() {
    return this.user$.asObservable();
  }

  init() {
    const user = localStorage.getItem(ENVINROMENT.userkey);
    if (user) {
      this.user$.next(JSON.parse(user));
    }
  }

  login(credentials: LoginCredentials) {
    this.loading$.next(true);
    this.http
      .post<User>(`${this.baseUrl}/auth/login`, credentials)
      .pipe(
        tap((response) => {
          this.loading$.next(false);
          this.user$.next(response);
          localStorage.setItem(ENVINROMENT.userkey, JSON.stringify(response));
          localStorage.setItem(ENVINROMENT.tokenKey, response.token);
          this.router.navigate(['/home']);
        }),
        catchError((error: HttpErrorResponse) => {
          this.errorMsg$.next(error.error.message);
          this.loading$.next(false);
          return of(false);
        })
      )
      .subscribe((response) => {});
  }

  checkUser() {
    return this.http.get<any>(`${this.baseUrl}/users`);
  }

  logOut() {
    localStorage.removeItem(ENVINROMENT.userkey);
    localStorage.removeItem(ENVINROMENT.tokenKey);
    this.user$.next(null);
    this.router.navigate(['/home']);
  }
}
