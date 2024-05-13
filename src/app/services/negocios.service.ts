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

  public crear(negocioNuevo: RegistroNegocioDTO) {}

  public eliminar(codigo: string) {}

  public buscar(terminoBusqueda: string): ItemNegocioDTO[] {
    return [];
  }
}
