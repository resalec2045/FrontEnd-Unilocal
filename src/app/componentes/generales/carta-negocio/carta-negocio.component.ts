import { Component, Input } from '@angular/core';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { TokenService } from '../../../services/token.service';
import Swal from 'sweetalert2';
import { AgregarFavoritosComponent } from '../agregar-favoritos/agregar-favoritos.component';

@Component({
  selector: 'app-carta-negocio',
  standalone: true,
  imports: [RouterOutlet, AgregarFavoritosComponent],
  templateUrl: './carta-negocio.component.html',
  styleUrl: './carta-negocio.component.css',
})
export class CartaNegocioComponent {
  @Input() establecimientoDTO: EstablecimientoDTO | undefined;
  @Input() isLogged = false;
  @Input() isFavorite: boolean = false;

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.isLogged = this.tokenService.isLogged();
  }
  public navigateToDetalleNegocio = () => {
    this.router.navigate([
      `detalle-negocio/${this.establecimientoDTO?.codigo}`,
    ]);
  };

  public generarRango(numero: number): number[] {
    return Array.from({ length: numero }, (_, i) => i + 1);
  }
}
