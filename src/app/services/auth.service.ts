import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';

interface AuthResponseData {
  username: string;
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'http://localhost:8080/auth/signIn',
        {
          username: username,
          password: password,
        },
        { observe: 'response', withCredentials: true }
      )
      .pipe(
        catchError(this.handleError),
        map((resData) => {
          if (resData.body) {
            this.handleAuth(resData.body.id, resData.body.username);
          }
          return resData.body;
        })
      );
  }

  test() {
    this.http
      .get('http://localhost:8080/game/?gameId=5', { withCredentials: true })
      .subscribe((res) => console.log(res));
  }

  private handleAuth(id: number, userName: string) {
    this.user.next({ id, username: userName });
  }

  private handleError(errorRes: HttpErrorResponse) {
    return throwError(() => new Error('SIGNIN goes wrong', errorRes.error));
  }

  getUserId() {
    return this.user.getValue()?.id;
  }

  getUserIdFromCookie(){
    return +document.cookie.split('=')[1].split('&')[0];
  }

  isAuthenticated(){
    return document.cookie.split("=")[0]==='auth_by_cookie'
  }
}
