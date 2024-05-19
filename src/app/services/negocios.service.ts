import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/ItemNegocioDTO';
import { RegistroNegocioDTO } from '../dto/RegistroNegocioDTO';
import { EstablecimientoDTO } from '../dto/EstablecimientoDTO';
import { Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../env/environment';
import Swal from 'sweetalert2';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class NegociosService {
  negocios: EstablecimientoDTO[];

  constructor(private tokenService: TokenService, private http: HttpClient) {
    this.negocios = [];
  }

  public listar(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/listar-establecimientos`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public obtenerById(codigoEstablecimiento: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/${codigoEstablecimiento}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public obtenerEstablecimientoAleatorio(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/obtener-establecimiento-aleatorio`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public obtenerMejoresEstablecimientos(): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/listar-mejores-establecimientos`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public listarFavoritosComunidad(pagina: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/listar-establecimientos-por-calificacion/${pagina}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public listarFavoritosCliente(codigoCliente: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/listar-establecimientos-por-cliente/${codigoCliente}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public crearEstablecimiento(negocioNuevo: RegistroNegocioDTO) {
    return this.http.post<any>(
      `${environment.apiUrl}/establecimiento/crear-establecimiento`,
      negocioNuevo,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public listarEstablecimientosPorCategoria(codigoCategoria: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/listar-establecimientos-por-categoria/${codigoCategoria}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public listarEstablecimientosPorEstado(estado: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/listar-establecimientos-por-estado-revision/${estado}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public actualizarEstablecimiento(establecimiento: EstablecimientoDTO): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/establecimiento/actualizar-establecimiento`,
      establecimiento,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public eliminarEstablecimiento(codigoEstablecimiento: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/establecimiento/${codigoEstablecimiento}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public listarEstablecimientosRevisionesCliente(codigoCliente: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/establecimiento/listar-establecimientos-por-revisiones-cliente/${codigoCliente}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

}
