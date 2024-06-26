import { Inject, Injectable } from '@angular/core';
import { ComentarioDTO } from '../dto/ComentarioDTO';
import { RegistroComentarioDTO } from '../dto/RegistroComentarioDTO';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { environment } from '../env/environment';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  constructor(private tokenService: TokenService, private http: HttpClient) {}

  public obtenerComentarios(idNegocio: string): Observable<any> {
    return this.http.get<any>(
      `${environment.apiUrl}/comentarios/listar-comentarios-establecimiento/${idNegocio}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public crearComentario(
    comentarioDTO: RegistroComentarioDTO
  ): Observable<any> {
    return this.http.post<any>(
      `${environment.apiUrl}/comentarios/registrar-comentario`,
      comentarioDTO,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public responderComentario(codigoComentario: string, respuesta: string): Observable<any> {
    return this.http.put<any>(
      `${environment.apiUrl}/comentarios/responder-comentario/${codigoComentario}`,
      {
        ComentarioInsertado: respuesta,
      },
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }

  public eliminarComentario(codigoComentario: string): Observable<any> {
    return this.http.delete<any>(
      `${environment.apiUrl}/comentarios/eliminar-comentario/${codigoComentario}`,
      {
        headers: this.tokenService.getRequestHeaders(),
      }
    );
  }
}
