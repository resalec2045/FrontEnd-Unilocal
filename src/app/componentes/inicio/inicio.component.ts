import { Component, OnInit } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { MapaService } from '../../services/mapa.service';
import { Router } from '@angular/router';
import { CartaNegocioComponent } from '../generales/carta-negocio/carta-negocio.component';
import { NegociosService } from '../../services/negocios.service';
import { EstablecimientoDTO } from '../../dto/EstablecimientoDTO';
import { FooterComponent } from '../generales/footer/footer/footer.component';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';
import { ClienteService } from '../../services/cliente.service';
import { ItemNegocioDTO } from '../../dto/ItemNegocioDTO';

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
  negocios: EstablecimientoDTO[];
  todosNegocios: EstablecimientoDTO[];
  establecimientoAleatorio: EstablecimientoDTO | undefined;
  mejoresEstablecimientos: EstablecimientoDTO[] | undefined;
  favoritos: string[];
  negociosFiltrados: EstablecimientoDTO[] | undefined = [];
  valorBusqueda: string = '';

  constructor(
    private mapaService: MapaService,
    private clienteService: ClienteService,
    private negociosService: NegociosService,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.negocios = [];
    this.favoritos = [];
    this.todosNegocios = [];
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.obtenerEstablecimientoAleatorio();
    this.obtenerMejoresEstablecimientos();
    this.listarNegocios();
  }

  public listarNegocios() {
    this.negociosService.listar().subscribe({
      next: (response) => {
        this.negocios = response;
        this.todosNegocios = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
    this.mapaService.crearMapa();
    if (this.tokenService.isLogged()) {
      this.listarFavoritos();
    }
  }

  public buscar(valor: string): void {
    this.negocios = [];
    this.negociosFiltrados = [];
    this.negociosFiltrados = this.todosNegocios.filter((negocio: EstablecimientoDTO) => {
      const nombreLowerCase = negocio.nombre.toLowerCase();
      const descripcionLowerCase = negocio.descripcion.toLowerCase();
      return nombreLowerCase.includes(valor.toLowerCase()) || descripcionLowerCase.includes(valor.toLowerCase());
    });
    console.log(this.negociosFiltrados);
    this.negocios = this.negociosFiltrados;
  }
  

  public obtenerEstablecimientoAleatorio() {
    this.negociosService.obtenerEstablecimientoAleatorio().subscribe({
      next: (response) => {
        this.establecimientoAleatorio = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public obtenerMejoresEstablecimientos() {
    this.negociosService.obtenerMejoresEstablecimientos().subscribe({
      next: (response) => {
        this.mejoresEstablecimientos = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public listarFavoritos() {
    const { id } = this.tokenService.decodePayload();
    this.clienteService.listarFavoritos(id).subscribe({
      next: (response) => {
        this.favoritos = response.respuesta;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  public esFavorito(codigo: string): boolean {
    return this.favoritos.includes(codigo);
  }

  public generarRango(numero: number): number[] {
    return Array.from({ length: numero }, (_, i) => i + 1);
  }

}
