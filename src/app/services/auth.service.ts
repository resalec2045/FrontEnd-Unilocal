import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { LoginDTO } from '../dto/LoginDTO';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { RegisterDTO } from '../dto/RegisterDTO';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private tokenService: TokenService, private http: HttpClient) {}

  public login(loginDTO: LoginDTO): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/login-cliente`,
      loginDTO
    );
  }

  public refresh(loginDTO: LoginDTO): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/refresh`,
      loginDTO
    );
  }

  public registrarCliente(registerDTO: RegisterDTO): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/auth/registrar-cliente`,
      registerDTO
    );
  }
}