import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NegociosService } from '../../../services/negocios.service';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { ComentarioDTO } from '../../../dto/ComentarioDTO';
import { CommonModule } from '@angular/common';
import { Dias } from '../../../enum/Dias';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css',
})
export class DetalleNegocioComponent {
  EstablecimientoDTO: EstablecimientoDTO | undefined;
  ComentariosDTO: ComentarioDTO[] | undefined;
  codigoEstablecimiento: string = '';

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private comentariosService: ComentariosService
  ) {
    this.route.params.subscribe((params) => {
      this.codigoEstablecimiento = params['codigo'];
      this.obtenerNegocio();
      this.obtenerComentarios();
    });
  }
  obtenerComentarios() {
    this.ComentariosDTO = [];
    this.ComentariosDTO = this.comentariosService.obtenerComentarios(
      this.codigoEstablecimiento
    );
  }

  public obtenerNegocio() {
    // this.codigoEstablecimiento = '66213ea875a2366c8c8635ee';
    this.EstablecimientoDTO = new EstablecimientoDTO();
    this.EstablecimientoDTO = this.negociosService.obtenerById(
      this.codigoEstablecimiento
    );
  }

  generarRango(numero: number): number[] {
    return Array.from({ length: numero }, (_, i) => i + 1);
  }

  estaAbierto(): string {
    const fechaActual = new Date();
    const diaActual = Dias[fechaActual.getDay()];
    const horaActual = fechaActual.getHours();

    const horarioEstablecimiento = this.EstablecimientoDTO?.horarios.find(
      (horario) => horario.dia === diaActual
    );

    if (horarioEstablecimiento) {
      if (
        horaActual >= Number(horarioEstablecimiento.horaApertura) &&
        horaActual < Number(horarioEstablecimiento.horaCierre)
      ) {
        return 'Abierto';
      } else {
        return 'Cerrado';
      }
    } else {
      return 'Cerrado';
    }
  }
}
