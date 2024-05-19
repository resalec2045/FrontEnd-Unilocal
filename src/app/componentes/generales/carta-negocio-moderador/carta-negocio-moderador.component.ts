import { Component, Input } from '@angular/core';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';
import { AgregarFavoritosComponent } from '../agregar-favoritos/agregar-favoritos.component';

@Component({
    selector: 'app-carta-negocio-moderador',
    standalone: true,
    templateUrl: './carta-negocio-moderador.component.html',
    styleUrl: '../carta-negocio/carta-negocio.component.css',
    imports: [AgregarFavoritosComponent]
})
export class CartaNegocioModeradorComponent {
  @Input() establecimientoDTO: EstablecimientoDTO | undefined;
  @Input() isLogged = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.isLogged = this.tokenService.isLogged();
  }
  public navigateToDetalleNegocio = () => {
    this.router.navigate([
      `revisiones-negocio-moderador/${this.establecimientoDTO?.codigo}`,
    ]);
  };

  public generarRango(numero: number): number[] {
    return Array.from({ length: numero }, (_, i) => i + 1);
  }
}

