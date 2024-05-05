import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { EstablecimientoDTO } from '../../dto/EstablecimientoDTO';
import { unilocalApi } from '../../api/unilocalApi';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-publicacion',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.scss'],
})
export class PublicacionComponent {

  EstablecimientoDTO: EstablecimientoDTO;
  codigoEstablecimiento: string;

  constructor(private unilocalApi: unilocalApi) {
    this.EstablecimientoDTO = new EstablecimientoDTO();
    this.codigoEstablecimiento = '66213ea875a2366c8c8635ee';
    this.unilocalApi.get<any>(`establecimiento/${this.codigoEstablecimiento}`).subscribe(
      (response) => {
        console.log(response);
        this.EstablecimientoDTO = response;
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
        });
      }
    );;
  }

}
