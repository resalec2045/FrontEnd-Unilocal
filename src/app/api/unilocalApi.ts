import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class unilocalApi {
  // private apiUrl: string = 'https://qcx14905-8080.use2.devtunnels.ms/api';
  private apiUrl: string = 'http://localhost:8080/api';
  private authToken: string = '';

  constructor(private http: HttpClient) {}

  setAuthToken(token: string) {
    localStorage.setItem('token', token);
    this.authToken = token;
  }

  private getRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    if (this.authToken) {
      headers = headers.set('xtoken', this.authToken);
    }
    return headers;
  }

  get<T>(endpoint: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.getRequestHeaders(),
    });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.getRequestHeaders(),
    });
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, {
      headers: this.getRequestHeaders(),
    });
  }

  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data, {
      headers: this.getRequestHeaders(),
    });
  }

}
