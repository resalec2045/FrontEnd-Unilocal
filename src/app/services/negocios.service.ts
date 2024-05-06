import { Injectable } from '@angular/core';
import { ItemNegocioDTO } from '../dto/ItemNegocioDTO';
import { RegistroNegocioDTO } from '../dto/RegistroNegocioDTO';
import { Ubicacion } from '../models/Ubicacion';
import { EstablecimientoDTO } from '../dto/EstablecimientoDTO';
import { Inject } from '@angular/core';
import { unilocalApi } from '../api/unilocalApi';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class NegociosService {
  negocios: ItemNegocioDTO[];

  constructor(@Inject(unilocalApi) private unilocalApi: unilocalApi) {
    this.negocios = [];
    this.negocios.push(
      new ItemNegocioDTO(
        '1',
        'Bar Armenia',
        'https://picsum.photos/100',
        'BAR',
        new Ubicacion(4.531456060381842, -75.68035469963664),
        4.5,
        'APROBADO'
      )
    );
    this.negocios.push(
      new ItemNegocioDTO(
        '2',
        'Restaurante La Casona',
        'https://picsum.photos/100',
        'RESTAURANTE',
        new Ubicacion(4.551298538672697, -75.65858458442557),
        4.0,
        'APROBADO'
      )
    );
    this.negocios.push(
      new ItemNegocioDTO(
        '3',
        'Peluquería La 33',
        'https://picsum.photos/100',
        'PELUQUERIA',
        new Ubicacion(4.541984423452234, -75.68579829641877),
        4.0,
        'RECHAZADO'
      )
    );
    this.negocios.push(
      new ItemNegocioDTO(
        '4',
        'Veterinaria Los Amigos',
        'https://picsum.photos/100',
        'VETERINARIA',
        new Ubicacion(4.539872786267409, -75.65011488244343),
        4.0,
        'APROBADO'
      )
    );
  }

  public listar(): ItemNegocioDTO[] {
    return this.negocios;
  }

  public obtener(codigo: string): ItemNegocioDTO | undefined {
    return this.negocios.find((negocios) => negocios.codigoNegocio == codigo);
  }

  public obtenerById(codigoEstablecimiento: string): EstablecimientoDTO {
    let establecimientoDTO: EstablecimientoDTO = new EstablecimientoDTO();

    this.unilocalApi
      .get<any>(`establecimiento/${codigoEstablecimiento}`)
      .subscribe(
        (response) => {
          console.log(response);
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

  public crear(negocioNuevo: RegistroNegocioDTO) {
    const codigo = (this.negocios.length + 1).toString();
    this.negocios.push(
      new ItemNegocioDTO(
        codigo,
        negocioNuevo.nombre,
        negocioNuevo.imagenes[0],
        negocioNuevo.tipoNegocio,
        negocioNuevo.ubicacion,
        0,
        'PENDIENTE'
      )
    );
  }

  public eliminar(codigo: string) {
    this.negocios = this.negocios.filter((n) => n.codigoNegocio !== codigo);
  }

  public buscar(terminoBusqueda: string): ItemNegocioDTO[] {
    const negocios: ItemNegocioDTO[] = this.negocios;
    const terminoBusquedaMinusculas = terminoBusqueda.toLowerCase();
    const nombresMinusculas = negocios.map((negocio) =>
      negocio.nombre.toLowerCase()
    );
    const negociosFiltrados = negocios.filter((negocio, index) => {
      return nombresMinusculas[index].includes(terminoBusquedaMinusculas);
    });
    return negociosFiltrados;
  }
}
