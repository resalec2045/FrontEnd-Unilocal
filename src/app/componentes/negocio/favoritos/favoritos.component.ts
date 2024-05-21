import { Component } from '@angular/core';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { ClienteService } from '../../../services/cliente.service';
import { NegociosService } from '../../../services/negocios.service';
import { TokenService } from '../../../services/token.service';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { CartaNegocioComponent } from '../../generales/carta-negocio/carta-negocio.component';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-favoritos',
  standalone: true,
  imports: [
    NavBarComponent,
    FooterComponent,
    CartaNegocioComponent,
    NgIf,
    NgFor,
  ],
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css',
})
export class FavoritosComponent {
  misFavoritos: EstablecimientoDTO[];
  favoritosComunidad: EstablecimientoDTO[];
  loading: boolean = true;
  selectPage!: string;

  constructor(
    private negociosService: NegociosService,
    private tokenService: TokenService
  ) {
    this.misFavoritos = [];
    this.favoritosComunidad = [];
    this.selectPage = 'misFavoritos';
  }

  ngOnInit() {
    this.listarFavoritos();
  }

  public listarFavoritos() {
    this.listarFavoritosCliente();
    this.listarFavoritosComunidad();
  }

  public listarFavoritosCliente() {
    const { id } = this.tokenService.decodePayload();
    this.negociosService.listarFavoritosCliente(id).subscribe({
      next: (response) => {
        this.misFavoritos = response;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public listarFavoritosComunidad() {
    this.negociosService.listarFavoritosComunidad('1').subscribe({
      next: (response) => {
        this.favoritosComunidad = response;
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public cambiarSelectPage(page: string) {
    this.selectPage = page;
  }

  public esFavorito(codigo: string): boolean {
    return (
      this.misFavoritos.filter((negocio) => negocio.codigo === codigo).length >
      0
    );
  }
}
