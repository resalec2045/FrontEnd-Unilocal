import { Component } from '@angular/core';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { CartaNegocioComponent } from '../../generales/carta-negocio/carta-negocio.component';
import { NgFor, NgIf } from '@angular/common';
import { NegociosService } from '../../../services/negocios.service';
import { TokenService } from '../../../services/token.service';

@Component({
  selector: 'app-mis-publicaciones',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CartaNegocioComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './mis-publicaciones.component.html',
  styleUrl: './mis-publicaciones.component.css',
})
export class MisPublicacionesComponent {

  selectPage!: string;

  constructor(
    private negociosService: NegociosService,
    private tokenService: TokenService
  ) {
    this.selectPage = 'Pendientes';
  }
  
  public cambiarSelectPage(page: string) {
    this.selectPage = page;
  }

}
