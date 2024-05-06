import { Component, Input } from '@angular/core';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-carta-negocio',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './carta-negocio.component.html',
  styleUrl: './carta-negocio.component.css',
})
export class CartaNegocioComponent {
  @Input() establecimientoDTO: EstablecimientoDTO | undefined;

  constructor(private router: Router) {}

  public navigateToDetalleNegocio = () => {
    this.router.navigate([
      `detalle-negocio/${this.establecimientoDTO?.codigo}`,
    ]);
  };
}
