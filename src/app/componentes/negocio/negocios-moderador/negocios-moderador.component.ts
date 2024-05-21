import { Component } from '@angular/core';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { EstablecimientoDTO } from '../../../dto/EstablecimientoDTO';
import { NegociosService } from '../../../services/negocios.service';
import { TokenService } from '../../../services/token.service';
import { CartaNegocioComponent } from '../../generales/carta-negocio/carta-negocio.component';
import { NgFor, NgIf } from '@angular/common';
import { FooterComponent } from '../../generales/footer/footer/footer.component';
import { CartaNegocioModeradorComponent } from '../../generales/carta-negocio-moderador/carta-negocio-moderador.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-negocios-moderador',
  standalone: true,
  templateUrl: './negocios-moderador.component.html',
  styleUrl: '../favoritos/favoritos.component.css',
  imports: [
    NavBarComponent,
    FooterComponent,
    CartaNegocioComponent,
    NgIf,
    NgFor,
    CartaNegocioModeradorComponent,
  ],
})
export class NegociosModeradorComponent {
  pendientes: EstablecimientoDTO[];
  revisados: EstablecimientoDTO[];
  codigoEstablecimiento: string = '';
  selectPage!: string;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private negociosService: NegociosService,
    private tokenService: TokenService
  ) {
    this.pendientes = [];
    this.revisados = [];
    this.selectPage = 'pendientes';
    this.route.params.subscribe((params) => {
      this.codigoEstablecimiento = params['codigo'];
    });
  }

  ngOnInit() {
    this.listarNegocios();
  }

  public listarNegocios() {
    this.listarPendientes();
    this.listarRevisados();
  }

  public listarPendientes() {
    this.negociosService
      .listarEstablecimientosPorEstado('PENDIENTE')
      .subscribe({
        next: (response) => {
          this.pendientes = response;
          this.loading = false;
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
        this.loading = false;
      },
      error: (error) => {
        console.log(error);
      },
    });

    this.negociosService
      .listarEstablecimientosPorEstado('RECHAZADA')
      .subscribe({
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
