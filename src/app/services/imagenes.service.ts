import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class ImagenesService {
  constructor(private tokenService: TokenService, private http: HttpClient) {}

  public subirImagen(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', imagen);
    return this.http.post<any>(
      `${environment.apiUrl}/imagenes/subir`,
      formData,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }
}