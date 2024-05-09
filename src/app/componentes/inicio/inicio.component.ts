import { Component, OnInit } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { MapaService } from '../../services/mapa.service';
import { Router } from '@angular/router';
import { CartaNegocioComponent } from '../generales/carta-negocio/carta-negocio.component';
import { NegociosService } from '../../services/negocios.service';
import { EstablecimientoDTO } from '../../dto/EstablecimientoDTO';
import { FooterComponent } from '../generales/footer/footer/footer.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    CartaNegocioComponent,
    FooterComponent,
  ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  negocios: EstablecimientoDTO[] | undefined;

  constructor(
    private mapaService: MapaService,
    private negociosService: NegociosService,
    private router: Router
  ) {
    this.negocios = [];
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.negociosService.listar().subscribe({
      next: (response) => {
        this.negocios = response;
      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }
}
