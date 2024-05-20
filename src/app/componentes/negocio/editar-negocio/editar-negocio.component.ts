import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { AgregarFavoritosComponent } from '../../generales/agregar-favoritos/agregar-favoritos.component';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { ItemComentarioDTO } from '../../../dto/ItemComentarioDTO';
import { NegociosService } from '../../../services/negocios.service';
import { ClienteService } from '../../../services/cliente.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';
import { RegistroComentarioDTO } from '../../../dto/RegistroComentarioDTO';
import { Dias } from '../../../enum/Dias';
import { FormsModule } from '@angular/forms';
import { MapaService } from '../../../services/mapa.service';
import { ImagenesService } from '../../../services/imagenes.service';
import { ActualizarEstablecimientoDTO } from '../../../dto/ActualizarEstablecimientoDTO';

@Component({
  selector: 'app-editar-negocio',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    CommonModule,
    FormsModule,
    FooterComponent,
    AgregarFavoritosComponent,
  ],
  templateUrl: './editar-negocio.component.html',
  styleUrl: './editar-negocio.component.css',
})
export class EditarNegocioComponent {
  establecimientoDTO: ActualizarEstablecimientoDTO | undefined;
  diasSemana: string[] = [
    'LUNES',
    'MARTES',
    'MIÉRCOLES',
    'JUEVES',
    'VIERNES',
    'SÁBADO',
    'DOMINGO',
  ];
  codigoEstablecimiento: string = '';
  isFavorite: boolean = false;
  isDueno: boolean = false;
  isLogged = false;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private clienteService: ClienteService,
    private comentariosService: ComentariosService,
    private imagenesService: ImagenesService,
    private tokenService: TokenService,
    private mapaService: MapaService
  ) {
    this.route.params.subscribe((params) => {
      this.codigoEstablecimiento = params['codigo'];
      this.isLogged = this.tokenService.isLogged();
      this.obtenerNegocio();
    });
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
  }

  public obtenerNegocio() {
    this.establecimientoDTO = new ActualizarEstablecimientoDTO();
    this.negociosService.obtenerById(this.codigoEstablecimiento).subscribe({
      next: (response) => {
        this.establecimientoDTO = response;
        this.mapaService.pintarMarcador(response);
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

  public actualizarEstablecimiento() {
    this.establecimientoDTO!.codigoUsuario =
      this.tokenService.decodePayload().id;
    this.negociosService
      .actualizarEstablecimiento(
        this.establecimientoDTO!,
        this.codigoEstablecimiento
      )
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Actualizado',
            text: 'El establecimiento ha sido actualizado',
            icon: 'success',
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  agregarHorario() {
    this.establecimientoDTO!.horarios.push({
      dia: '',
      horaApertura: '',
      horaCierre: '',
    });
  }

  eliminarHorario(index: number) {
    this.establecimientoDTO!.horarios.splice(index, 1);
  }

  eliminarImagen(index: number) {
    this.establecimientoDTO!.imagenes.splice(index, 1);
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.subirImagen(file);
  }

  public subirImagen(imagen: File) {
    this.imagenesService.subirImagen(imagen).subscribe({
      next: (response) => {
        this.establecimientoDTO!.imagenes.push(response.respuesta.url);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public generarRango(numero: number): number[] {
    return Array.from({ length: numero }, (_, i) => i + 1);
  }

  public userIsDueno() {
    const { id } = this.tokenService.decodePayload();

    id === this.establecimientoDTO?.codigoUsuario
      ? (this.isDueno = true)
      : (this.isDueno = false);
  }

  public isDuenoComentario(idUsuario: string): boolean {
    const { id } = this.tokenService.decodePayload();
    return id === idUsuario;
  }
}
