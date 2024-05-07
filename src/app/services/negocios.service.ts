import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/ItemNegocioDTO';
import { RegistroNegocioDTO } from '../dto/RegistroNegocioDTO';
import { EstablecimientoDTO } from '../dto/EstablecimientoDTO';
import { Inject } from '@angular/core';
import { unilocalApi } from '../api/unilocalApi';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NegociosService {
  negocios: EstablecimientoDTO[];

  constructor(@Inject(unilocalApi) private unilocalApi: unilocalApi) {
    this.negocios = [];
  }

  public listar(): EstablecimientoDTO[] {
    this.unilocalApi
      .get<any>('establecimiento/listar-establecimientos')
      .subscribe(
        (response) => {
          this.negocios = response;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta,
          });
        }
      );

    return this.negocios;
  }

  public obtenerById(codigoEstablecimiento: string): EstablecimientoDTO {
    let establecimientoDTO: EstablecimientoDTO = new EstablecimientoDTO();

    this.unilocalApi
      .get<any>(`establecimiento/${codigoEstablecimiento}`)
      .subscribe(
        (response) => {
          // TODO: Remove this line
          response.promedio = 3;
          establecimientoDTO = response;
        },
        (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta,
          });
        }
      );

    return establecimientoDTO;
  }

  public crear(negocioNuevo: RegistroNegocioDTO) {}

  public eliminar(codigo: string) {}

  public buscar(terminoBusqueda: string): ItemNegocioDTO[] {
    return [];
  }
}
