import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';
import { ItemActualizarRevisionDTO } from '../dto/ItemActualizarRevisionDTO';

@Injectable({
  providedIn: 'root',
})
export class RevisionesServices {
  constructor(private tokenService: TokenService, private http: HttpClient) {}

  public listarRevisionesPorCodigo(codigoPublicacion: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/revision/listar-revisiones-codigo-establecimiento/` +
        codigoPublicacion
    );
  }

  public actualizarRevision(
    codigo: string,
    itemActualizarRevisionDTO: ItemActualizarRevisionDTO
  ): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/revision/actualizar-revision/${codigo}`,
      itemActualizarRevisionDTO
    );
  }
}
