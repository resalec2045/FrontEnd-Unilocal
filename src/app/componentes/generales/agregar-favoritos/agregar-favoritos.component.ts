import { Component, Input } from '@angular/core';
import { TokenService } from '../../../services/token.service';
import { ClienteService } from '../../../services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-favoritos',
  standalone: true,
  imports: [],
  templateUrl: './agregar-favoritos.component.html',
  styleUrl: './agregar-favoritos.component.css',
})
export class AgregarFavoritosComponent {
  @Input() codigoEstablecimiento: string = '';
  @Input() isFavorite: boolean = false;

  constructor(
    private clienteService: ClienteService,
    private tokenService: TokenService
  ) {}

  public agregarFavorito = () => {
    const { id } = this.tokenService.decodePayload();
    console.log(this.codigoEstablecimiento, id);
    this.clienteService.marcarFavorito(this.codigoEstablecimiento, id).subscribe({
      next: (response) => {
        this.isFavorite = true;
        Swal.fire({
          title: '¡Listo!',
          text: 'Negocio marcado como favorito',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  };

  public eliminarLugarFavorito = () => {
    const { id } = this.tokenService.decodePayload();
    this.clienteService
      .eliminarFavorito(this.codigoEstablecimiento, id)
      .subscribe({
        next: (response) => {
          this.isFavorite = false;
          Swal.fire({
            title: '¡Listo!',
            text: 'Negocio eliminado de favoritos',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        error: (error) => {
          console.log(error);
        },
      });
  };
}
