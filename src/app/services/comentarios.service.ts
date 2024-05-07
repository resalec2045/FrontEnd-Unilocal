import { Inject, Injectable } from '@angular/core';
import { unilocalApi } from '../api/unilocalApi';
import { ComentarioDTO } from '../dto/ComentarioDTO';
import Swal from 'sweetalert2';
import { RegistroComentarioDTO } from '../dto/RegistroComentarioDTO';

@Injectable({
  providedIn: 'root',
})
export class ComentariosService {
  constructor(@Inject(unilocalApi) private unilocalApi: unilocalApi) {}

  public obtenerComentarios(idNegocio: string): ComentarioDTO[] {
    let comentarioDTO: ComentarioDTO[] = [];

    this.unilocalApi
      .get<any>(`comentarios/listar-comentarios-establecimiento/${idNegocio}`)
      .subscribe(
        (response) => {
          comentarioDTO = response.respuesta;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error,
          });
        }
      );

    return comentarioDTO;
  }

  public crearComentario(comentarioDTO: RegistroComentarioDTO) {
    this.unilocalApi
      .post<any>('comentarios/registrar-comentario', comentarioDTO)
      .subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: response.respuesta,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta,
          });
        }
      );
  }

  public responderComentario(codigoComentario: string, respuesta: string) {
    this.unilocalApi
      .put<any>(
        `comentarios/responder-comentario/${codigoComentario}`,
        respuesta
      )
      .subscribe(
        (response) => {
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: response.respuesta,
          });
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta,
          });
        }
      );
  }
}
