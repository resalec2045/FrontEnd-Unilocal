import { Inject, Injectable } from '@angular/core';
import { unilocalApi } from '../api/unilocalApi';
import { ComentarioDTO } from '../dto/ComentarioDTO';
import Swal from 'sweetalert2';

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
          console.log(response);
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
}
