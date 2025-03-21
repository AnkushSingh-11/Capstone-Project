import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = '/api/auth';

  constructor(private http: HttpClient) {}

  registerUser(user: any): Observable<any> {
    console.log('Registering User:', user);
    return this.http.post(`${this.apiUrl}/register`, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }

  loginUser(email: string, password: string): Observable<any> {
    console.log('Logging in with:', email, password);
    return this.http.post(`${this.apiUrl}/login`, { email, password }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    });
  }
}
