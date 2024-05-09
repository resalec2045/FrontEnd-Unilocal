import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from "buffer";

const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private authToken: string = '';

  constructor(private router: Router, private http: HttpClient) {}

  public setToken(token: string) {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
    this.authToken = token;
  }

  public getToken(): string | null {
    return this.authToken;
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string) {
    this.setToken(token);
    this.router.navigate(['/']);
  }

  public logout() {
    window.sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  private decodePayload(token: string): any {
    const payload = token!.split('.')[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Authorization': 'Bearer' + this.authToken,
    });
    return headers;
  }
}
