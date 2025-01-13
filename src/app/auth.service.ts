import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8082/auth';

  constructor(private http: HttpClient) { }

  login(username:string, password:string): Observable<any> {
    const loginObservable = this.http.post(`${this.apiUrl}/login`, {username, password});
    loginObservable.subscribe({
      next: response => {
        console.log('Login successful', response);
      },
      error: error => {
        console.error('Login failed', error);
      }
    });
    return loginObservable;
  }

  signup(username:string, email:string, password:string): Observable<any> {
    return this.http.post(`${this.apiUrl}/signup`, {username, email, password});
  }
}
