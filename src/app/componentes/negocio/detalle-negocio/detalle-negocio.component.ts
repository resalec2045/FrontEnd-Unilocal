import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NegociosService } from '../../../services/negocios.service';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { ComentarioDTO } from '../../../dto/ComentarioDTO';
import { CommonModule } from '@angular/common';
import { Dias } from '../../../enum/Dias';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { RegistroComentarioDTO } from '../../../dto/RegistroComentarioDTO';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CommonModule, FooterComponent],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css',
})
export class DetalleNegocioComponent {
  establecimientoDTO: EstablecimientoDTO | undefined;
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

  // Peticiones

  obtenerComentarios() {
    this.ComentariosDTO = [];
    this.ComentariosDTO = this.comentariosService.obtenerComentarios(
      this.codigoEstablecimiento
    );
  }

  public obtenerNegocio() {
    this.establecimientoDTO = new EstablecimientoDTO();
    this.establecimientoDTO = this.negociosService.obtenerById(
      this.codigoEstablecimiento
    );
  }

  public crearComentario(event: any, comentario: string, valoracion: number) {
    event.preventDefault();
    this.comentariosService.crearComentario(
      new RegistroComentarioDTO(
        // TODO: CAMBIAR POR EL ID DEL USUARIO LOGUEADO
        '66213ea775a2366c8c8635ec',
        this.establecimientoDTO?.codigo,
        `${new Date('YYYY-MM-DD')}`,
        comentario,
        valoracion,
        ''
      )
    );
  }
  public responderComentario(
    event: any,
    idComentario: string,
    comentario: string
  ) {
    event.preventDefault();
    this.comentariosService.responderComentario(idComentario, comentario);
  }

  // Metodo añadidos

  public generarRango(numero: number): number[] {
    return Array.from({ length: numero }, (_, i) => i + 1);
  }

  public estaAbierto(): string {
    const fechaActual = new Date();
    const diaActual = Dias[fechaActual.getDay()];
    const horaActual = fechaActual.getHours();

    const horarioEstablecimiento = this.establecimientoDTO?.horarios.find(
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
