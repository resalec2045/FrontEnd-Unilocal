import { Component } from '@angular/core';
import { AgregarFavoritosComponent } from '../../generales/agregar-favoritos/agregar-favoritos.component';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { NegociosService } from '../../../services/negocios.service';
import { ClienteService } from '../../../services/cliente.service';
import { ComentariosService } from '../../../services/comentarios.service';
import { ImagenesService } from '../../../services/imagenes.service';
import { TokenService } from '../../../services/token.service';
import { MapaService } from '../../../services/mapa.service';
import { ActualizarEstablecimientoDTO } from '../../../dto/ActualizarEstablecimientoDTO';
import { RegistroNegocioDTO } from '../../../dto/RegistroNegocioDTO';
import { RevisionesServices } from '../../../services/revisiones.service';
import { RevisionDTO } from '../../../dto/RevisionDTO';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    CommonModule,
    FormsModule,
    FooterComponent,
    AgregarFavoritosComponent,
  ],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css',
})
export class CrearNegocioComponent {
  diasSemana: string[] = [
    'LUNES',
    'MARTES',
    'MIÉRCOLES',
    'JUEVES',
    'VIERNES',
    'SÁBADO',
    'DOMINGO',
  ];
  establecimientoDTO: RegistroNegocioDTO | undefined;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private clienteService: ClienteService,
    private comentariosService: ComentariosService,
    private imagenesService: ImagenesService,
    private tokenService: TokenService,
    private mapaService: MapaService,
    private revisionesService: RevisionesServices,
    private router: Router
  ) {
    this.establecimientoDTO = new RegistroNegocioDTO();
    this.establecimientoDTO.telefonos.push('');
    this.establecimientoDTO.horarios.push({
      dia: '',
      horaApertura: '',
      horaCierre: '',
    });
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe({
      next: (response) => {
        this.establecimientoDTO!.ubicacion.latitud = response.lat;
        this.establecimientoDTO!.ubicacion.longitud = response.lng;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public crearEstablecimiento() {
    this.establecimientoDTO!.codigoUsuario =
      this.tokenService.decodePayload().id;
    this.negociosService
      .crearEstablecimiento(this.establecimientoDTO!)
      .subscribe({
        next: (response) => {
          this.crearRevision(response.respuesta);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public crearRevision(codigoEstablecimiento: string) {
    this.revisionesService.registrarRevision(new RevisionDTO(
      codigoEstablecimiento,
      "REVISION DE ESTABLECIMIENTO",
      "PENDIENTE",
      new Date().toISOString(),
      // TODO: Si queda tiempo realizar peticion que traiga el codigo del moderador o cambiar en el back
      "66493ae28ede3919af6b84df"
    )).subscribe({
      next: (response) => {
        this.router.navigate(['/mis-publicaciones']);
        Swal.fire({
          icon: 'success',
          title: 'Establecimiento creado',
          text: 'El establecimiento ha sido creado exitosamente',
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
}
