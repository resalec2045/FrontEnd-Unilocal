import { Component, Input } from '@angular/core';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';
import { AgregarFavoritosComponent } from '../agregar-favoritos/agregar-favoritos.component';
import { RevisionEstablecimientoDTO } from '../../../dto/RevisionEstablecimientoDTO';
import { NegociosService } from '../../../services/negocios.service';

@Component({
  selector: 'app-carta-negocio-revision',
  standalone: true,
  imports: [RouterOutlet, AgregarFavoritosComponent],
  templateUrl: './carta-negocio-revision.component.html',
  styleUrl: './carta-negocio-revision.component.css',
})
export class CartaNegocioRevisionComponent {
  @Input() establecimiento: RevisionEstablecimientoDTO | undefined;

  constructor(
    private authService: AuthService,
    private negociosService: NegociosService,
    private tokenService: TokenService,
    private router: Router
  ) {
  }

  public navigateToDetalleNegocio = () => {
    this.router.navigate([
      `detalle-negocio/${this.establecimiento?._id}`,
    ]);
  };
  
  public eliminarPublicacion = (codigoEstablecimiento: string) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#55286f',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.negociosService.eliminarEstablecimiento(codigoEstablecimiento).subscribe({
          next: (response) => {
            Swal.fire('Eliminado', 'La publicación ha sido eliminada', 'success');
          },
          error: (error) => {
            Swal.fire('Error', 'No se pudo eliminar la publicación', 'error');
          },
        });
      }
    });
  }

  public editarPublicacion = (codigoEstablecimiento: string) => {

  }
}
