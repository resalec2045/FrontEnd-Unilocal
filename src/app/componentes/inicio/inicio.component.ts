import { Component, OnInit } from '@angular/core';
import { Route, RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { MapaService } from '../../services/mapa.service';
import { Router } from '@angular/router';
import { CartaNegocioComponent } from '../generales/carta-negocio/carta-negocio.component';
import { EstablecimientoDTO } from '../../dto/EstablecimientoDTO';
import { Ubicacion } from '../../models/Ubicacion';
import { Horario } from '../../models/Horario';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent, CartaNegocioComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent implements OnInit {
  imagen: string = '../../../assets/images/image1.jpeg';
  imagen2: string = '../../../assets/images/image2.jpeg';
  imagen3: string = '../../../assets/images/image3.jpeg';

  // TODO: IMPLEMENTAR SERVICIO PARA OBTENER TODOS LOS ESTABLECIMIENTOS Y PINTARLOS EN LA TARJETA

  constructor(private mapaService: MapaService, private router: Router) {}
  ngOnInit(): void {
    this.mapaService.crearMapa();
  }

  public iraBusqueda(valor: string) {
    if (valor) {
      this.router.navigate(['/busqueda', valor]);
    }
  }
}
