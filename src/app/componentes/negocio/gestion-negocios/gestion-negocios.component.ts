import { Component } from '@angular/core';
import { ItemNegocioDTO } from '../../../dto/ItemNegocioDTO';
import { NegociosService } from '../../../services/negocios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-gestion-negocios',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gestion-negocios.component.html',
  styleUrl: './gestion-negocios.component.css',
})
export class GestionNegociosComponent {
  negocios: ItemNegocioDTO[];
  seleccionados: ItemNegocioDTO[];
  textoBtnEliminar: String;

  constructor(private negocioService: NegociosService) {
    this.negocios = [];
    this.seleccionados = [];
    this.textoBtnEliminar = '';
    this.listarNegocios();
  }

  public listarNegocios() {
    this.negocios = this.negocioService.listar();
  }

  public seleccionar(item: ItemNegocioDTO, estado: boolean) {
    if (estado) {
      this.seleccionados.push(item);
    } else {
      this.seleccionados.splice(this.seleccionados.indexOf(item), 1);
    }
    this.actualizarMensaje();
  }

  private actualizarMensaje() {
    const tam = this.seleccionados.length;
    if (tam != 0) {
      if (tam == 1) {
        this.textoBtnEliminar = '1 elemento';
      } else {
        this.textoBtnEliminar = tam + ' elementos';
      }
    } else {
      this.textoBtnEliminar = '';
    }
  }

  public borrarNegocios() {
    this.seleccionados.forEach((n) => {
      this.negocioService.eliminar(n.codigoNegocio);
      this.negocios = this.negocios.filter(
        (negocio) => negocio.codigoNegocio !== n.codigoNegocio
      );
    });
    this.seleccionados = [];
    this.actualizarMensaje();
  }
}
