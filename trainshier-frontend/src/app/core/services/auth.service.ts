import { Injectable } from '@angular/core';

import {
  HttpClient
} from '@angular/common/http';

import {
  Observable,
  tap
} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl =
    'http://localhost:8080/auth';

  constructor(
    private http: HttpClient
  ) {}

  login(
    credentials: any
  ): Observable<any> {

    return this.http
      .post<any>(
        `${this.apiUrl}/login`,
        credentials
      )
      .pipe(

        tap(response => {

          localStorage.setItem(
            'token',
            response.token
          );

          localStorage.setItem(
            'role',
            response.role
          );

          localStorage.setItem(
            'name',
            response.name
          );

          localStorage.setItem(
            'userId',
            String(response.userId)
          );

        })

      );

  }

  register(
    data: any
  ): Observable<any> {

    return this.http.post(
      `${this.apiUrl}/register`,
      data
    );

  }

  logout(): void {

    localStorage.clear();

  }

}
