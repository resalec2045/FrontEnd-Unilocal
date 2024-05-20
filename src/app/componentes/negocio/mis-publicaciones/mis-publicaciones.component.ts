import { Component } from '@angular/core';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { NegociosService } from '../../../services/negocios.service';
import { TokenService } from '../../../services/token.service';
import { RevisionEstablecimientoDTO } from '../../../dto/RevisionEstablecimientoDTO';
import { CartaNegocioRevisionComponent } from '../../generales/carta-negocio-revision/carta-negocio-revision.component';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-mis-publicaciones',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CartaNegocioRevisionComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './mis-publicaciones.component.html',
  styleUrl: './mis-publicaciones.component.css',
})
export class MisPublicacionesComponent {
  publicaciones: RevisionEstablecimientoDTO[] | undefined;

  constructor(
    private negociosService: NegociosService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.publicaciones = [];
  }

  public ngOnInit() {
    this.obtenerMisPublicaciones();
  }

  public obtenerMisPublicaciones() {
    const { id } = this.tokenService.decodePayload();
    this.negociosService.listarEstablecimientosRevisionesCliente(id).subscribe({
      next: (response) => {
        this.publicaciones = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public agregarPublicacion = () => {
    this.router.navigate(['/crear-negocio']);
  };
}
