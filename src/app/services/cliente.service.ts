import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  constructor(private tokenService: TokenService, private http: HttpClient) {}

  public marcarFavorito(
    codigoPublicacion: string,
    codigoCliente: string
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/clientes/marcar-lugar-favorito`,
      { codigoPublicacion, codigoCliente },
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public eliminarFavorito(
    codigoPublicacion: string,
    codigoCliente: string
  ): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/clientes/eliminar-lugar-favorito`,
      {
        body: { codigoPublicacion, codigoCliente },
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public listarFavoritos(codigoCliente: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/clientes/listar-lugares-favoritos/${codigoCliente}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }
}
