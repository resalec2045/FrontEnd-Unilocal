import { Component } from '@angular/core';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { ActivatedRoute } from '@angular/router';
import { NegociosService } from '../../../services/negocios.service';
import { TokenService } from '../../../services/token.service';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';
import { RevisionesServices } from '../../../services/revisiones.service';
import { RevisionDTO } from '../../../dto/RevisionDTO';
import { DetalleClienteDTO } from '../../../dto/DetalleClienteDTO';
import { ItemRevisionDTO } from '../../../dto/ItemRevisionDTO';

@Component({
  selector: 'app-revisiones-negocio-moderador',
  standalone: true,
  templateUrl: './revisiones-negocio-moderador.component.html',
  imports: [NavBarComponent, FooterComponent],
  styleUrl: '../detalle-negocio/detalle-negocio.component.css',
})
export class RevisionesNegocioModeradorComponent {
  establecimientoDTO: EstablecimientoDTO | undefined;
  revisiones: ItemRevisionDTO[];
  revisionesEstablecimiento: RevisionDTO[];
  revisionDTO: ItemRevisionDTO;
  detalleClienteDTO: DetalleClienteDTO;
  codigoEstablecimiento: string = '';
  isLogged = false;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private revisionesServices: RevisionesServices,
    private clienteService: ClienteService,
    private tokenService: TokenService
  ) {
    this.revisiones = [];
    this.revisionesEstablecimiento = [];
    this.revisionDTO = new ItemRevisionDTO();
    this.detalleClienteDTO = new DetalleClienteDTO();
    this.route.params.subscribe((params) => {
      console.log(params['codigo']);
      this.codigoEstablecimiento = params['codigo'];
      this.isLogged = this.tokenService.isLogged();
      this.obtenerNegocio();
      this.obtenerRevisiones();
    });
  }

  public generarRango(numero: number): number[] {
    return Array.from({ length: numero }, (_, i) => i + 1);
  }

  public obtenerNegocio() {
    this.establecimientoDTO = new EstablecimientoDTO();
    this.negociosService.obtenerById(this.codigoEstablecimiento).subscribe({
      next: (response) => {
        this.establecimientoDTO = response;
        if (!this.tokenService.isLogged()) {
          Swal.fire({
            title: 'Inicia sesión',
            text: 'Para poder realizar una revisión debes iniciar sesión',
            icon: 'warning',
          });
        }
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public obtenerRevisiones() {
    this.revisionesServices
      .listarRevisionesPorCodigo(this.codigoEstablecimiento)
      .subscribe({
        next: (response) => {
          this.revisiones = response;
          this.revisionDTO = response;
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public enviarRevision(opcion: string) {
    this.revisionDTO.estado = opcion;
    this.revisionDTO.descripcion = `La revisión ha sido ${opcion}`;
    this.revisionesServices
      .actualizarRevision(this.revisionDTO.codigo, this.revisionDTO)
      .subscribe({
        next: (response) => {
          window.sessionStorage.clear();
          Swal.fire({
            title: '¡Hecho!',
            text: 'Se ha enviado la revisión de forma satisfactoria.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        error: (error) => {
          Swal.fire({
            title: '¡Error!',
            text: 'Tenemos un error en nuestro servidor. Intenta de nuevo, más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }

  obtenerNombrePorCodigo(codigo: string): string {
    this.clienteService.obtenerClientePorCodigo(codigo).subscribe({
      next: (response) => {
        this.detalleClienteDTO = response;
        return this.detalleClienteDTO.nombre;
      },
      error: (error) => {
        console.log(error);
      },
    });
    return '';
  }

  obtenerFecha(): string {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const monthNames = [
      'enero',
      'febrero',
      'marzo',
      'abril',
      'mayo',
      'junio',
      'julio',
      'agosto',
      'septiembre',
      'octubre',
      'noviembre',
      'diciembre',
    ];
    const formattedDate = `${day} de ${monthNames[month - 1]} de ${year}`;
    return formattedDate;
  }
}
