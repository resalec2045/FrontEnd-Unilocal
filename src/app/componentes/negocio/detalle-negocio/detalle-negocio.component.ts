import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NegociosService } from '../../../services/negocios.service';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { ComentariosService } from '../../../services/comentarios.service';
import { CommonModule } from '@angular/common';
import { Dias } from '../../../enum/Dias';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { RegistroComentarioDTO } from '../../../dto/RegistroComentarioDTO';
import { ItemComentarioDTO } from '../../../dto/ItemComentarioDTO';
import { TokenService } from '../../../services/token.service';
import { AgregarFavoritosComponent } from '../../generales/agregar-favoritos/agregar-favoritos.component';
import Swal from 'sweetalert2';
import { ClienteService } from '../../../services/cliente.service';

@Component({
  selector: 'app-detalle-negocio',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    CommonModule,
    FooterComponent,
    AgregarFavoritosComponent,
  ],
  templateUrl: './detalle-negocio.component.html',
  styleUrl: './detalle-negocio.component.css',
})
export class DetalleNegocioComponent {
  establecimientoDTO: EstablecimientoDTO | undefined;
  comentariosDTO: ItemComentarioDTO[] | undefined;
  codigoEstablecimiento: string = '';
  isDueno: boolean = false;
  isLogged = false;
  favoritos: string[];
  // TODO: implementar el componente de favoritos
  isFavorite: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private clienteService: ClienteService,
    private comentariosService: ComentariosService,
    private tokenService: TokenService
  ) {
    this.favoritos = [];
    this.route.params.subscribe((params) => {
      this.codigoEstablecimiento = params['codigo'];
      this.isLogged = this.tokenService.isLogged();
      this.obtenerNegocio();
      this.obtenerComentarios();
    });
  }

  ngOnInit(): void {
    if (this.tokenService.isLogged()) {
      this.listarFavoritos();
    }
  }

  // Peticiones

  public obtenerComentarios() {
    this.comentariosDTO = [];
    this.comentariosService
      .obtenerComentarios(this.codigoEstablecimiento)
      .subscribe({
        next: (response) => {
          this.comentariosDTO = response.respuesta;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public obtenerNegocio() {
    this.establecimientoDTO = new EstablecimientoDTO();
    this.negociosService.obtenerById(this.codigoEstablecimiento).subscribe({
      next: (response) => {
        this.establecimientoDTO = response;
        if (this.tokenService.isLogged()) {
          this.userIsDueno();
        } else {
          Swal.fire({
            title: 'Inicia sesión',
            text: 'Para poder realizar un comentario debes iniciar sesión',
            icon: 'warning',
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public crearComentario(event: any, comentario: string, valoracion: number) {
    event.preventDefault();
    const { id } = this.tokenService.decodePayload();
    this.comentariosService
      .crearComentario(
        new RegistroComentarioDTO(
          id,
          this.establecimientoDTO?.codigo,
          `${new Date('YYYY-MM-DD')}`,
          comentario,
          valoracion,
          ''
        )
      )
      .subscribe({
        next: (response) => {
          this.obtenerComentarios();
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: response.respuesta,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta,
          });
        },
      });
  }

  public responderComentario(
    event: any,
    idComentario: string,
    comentario: string
  ) {
    event.preventDefault();
    this.comentariosService
      .responderComentario(idComentario, comentario)
      .subscribe({
        next: (response) => {
          this.obtenerComentarios();
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: response.respuesta,
          });
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.respuesta,
          });
        },
      });
  }

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

  public userIsDueno() {
    const { id } = this.tokenService.decodePayload();

    id === this.establecimientoDTO?.codigoUsuario
      ? (this.isDueno = true)
      : (this.isDueno = false);
  }

  public listarFavoritos() {
    const { id } = this.tokenService.decodePayload();
    this.clienteService.listarFavoritos(id).subscribe({
      next: (response) => {
        this.favoritos = response.respuesta;
        this.isFavorite = this.esFavorito(this.codigoEstablecimiento);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public esFavorito(codigo: string): boolean {
    return this.favoritos.includes(codigo);
  }
}
