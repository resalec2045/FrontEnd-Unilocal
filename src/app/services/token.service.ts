import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';

const TOKEN_KEY = 'AuthToken';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  private authToken: string | null = '';

  constructor(private router: Router, private http: HttpClient) {}

  public setToken() {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, this.authToken!);
  }

  public getToken(): string | null {
    try {
      this.authToken = sessionStorage.getItem(TOKEN_KEY);
    } catch (error) {
      this.authToken = '';
    }
    return this.authToken;
  }

  public isLogged(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  public login(token: string) {
    this.authToken = token;
    this.setToken();
    this.router.navigate(['/inicio']);
  }

  public logout() {
    if (this.authToken != '') {
      Swal.fire({
        title: 'Sesión cerrada',
        text: 'Hasta luego :3',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });
    }
    window.sessionStorage.clear();
    this.router.navigate(['/login'])
  }

  public getRole(): string {
    const token = this.getToken();
    if (token) {
      const values = this.decodePayload();
      return values.rol;
    }
    return "";
  }

  public decodePayload(): any {
    const payload = this.authToken!.split('.')[1];
    const payloadDecoded = Buffer.from(payload, 'base64').toString('ascii');
    const values = JSON.parse(payloadDecoded);
    return values;
  }

  public getRequestHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      Authorization: `Bearer ${this.authToken}`,
    });
    return headers;
  }

  public getEmail(): string {
    const token = this.getToken();
    if (token) {
    const values = this.decodePayload();
    return values.sub;
    }
    return "";
    }
}
