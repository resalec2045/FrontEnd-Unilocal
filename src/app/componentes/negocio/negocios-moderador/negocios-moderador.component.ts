import { Component } from '@angular/core';
import { NavBarComponent } from "../../generales/navbar/navbar.component";
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { NegociosService } from '../../../services/negocios.service';
import { TokenService } from '../../../services/token.service';
import { CartaNegocioComponent } from "../../generales/carta-negocio/carta-negocio.component";
import { NgFor, NgIf } from '@angular/common';
import { FooterComponent } from '../../generales/footer/footer/footer.component';

@Component({
    selector: 'app-negocios-moderador',
    standalone: true,
    imports: [
      NavBarComponent,
      FooterComponent,
      CartaNegocioComponent,
      NgIf,
      NgFor,
    ],
    templateUrl: './negocios-moderador.component.html',
    styleUrl: '../favoritos/favoritos.component.css',
})
export class NegociosModeradorComponent {
  selectPage!: string;
  pendientes: EstablecimientoDTO[];
  revisados: EstablecimientoDTO[];

  constructor(
    private negociosService: NegociosService,
    private tokenService: TokenService
  ) {
    this.pendientes = [];
    this.revisados = [];
    this.selectPage = 'pendientes';
  }

  ngOnInit() {
    this.listarNegocios();
  }

  public listarNegocios() {
    this.listarPendientes();
    this.listarRevisados();
  }

  public listarPendientes() {
    this.negociosService.listarEstablecimientosPorEstado('PENDIENTE').subscribe({
      next: (response) => {
        this.pendientes = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public listarRevisados() {
    this.negociosService.listarEstablecimientosPorEstado('APROBADA').subscribe({
      next: (response) => {
        this.revisados = response;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.negociosService.listarEstablecimientosPorEstado('RECHAZADA').subscribe({
      next: (response) => {
        this.revisados.concat(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public cambiarSelectPage(page: string) {
    this.selectPage = page;
  }
}
