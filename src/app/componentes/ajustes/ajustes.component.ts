import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { FooterComponent } from '../generales/footer/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { ClienteService } from '../../services/cliente.service';
import { ImagenesService } from '../../services/imagenes.service';
import { ClienteActualizadoDTO } from '../../dto/ClienteActualizadoDTO';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [NavBarComponent, FooterComponent, FormsModule],
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css',
})
export class AjustesComponent {
  clienteActualizadoDTO: ClienteActualizadoDTO;
  constructor(
    private tokenService: TokenService,
    private clienteService: ClienteService,
    private imagenesService: ImagenesService
  ) {
    this.clienteActualizadoDTO = new ClienteActualizadoDTO();
  }

  ngOnInit(): void {
    this.obtenerCliente();
  }

  public guardarCambios() {
    this.insertarImagen();

    // this.clienteService.actualizarCliente(this.clienteActualizadoDTO).subscribe(
    //   {
    //     next: (data) => {
    //       console.log(data);
    //     },
    //     error: (error) => {
    //       console.log(error);
    //     }
    //   }
    // );
  }

  public insertarImagen() {
    this.imagenesService
      .subirImagen(this.clienteActualizadoDTO.fotoActualizada)
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  public obtenerCliente() {
    const { id } = this.tokenService.decodePayload();
    this.clienteService.obtenerCliente(id).subscribe({
      next: (data) => {
        this.clienteActualizadoDTO = data.respuesta;
        console.log(this.clienteActualizadoDTO);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  isFieldEnabledNombre: boolean = false;
  isFieldEnabledApodo: boolean = false;
  isFieldEnabledCorreo: boolean = false;
  isFieldEnabledCiudad: boolean = false;

  habilitarEdicionNombre() {
    this.isFieldEnabledNombre = !this.isFieldEnabledNombre;
  }

  habilitarEdicionApodo() {
    this.isFieldEnabledApodo = !this.isFieldEnabledApodo;
  }

  habilitarEdicionCorreo() {
    this.isFieldEnabledCorreo = !this.isFieldEnabledCorreo;
  }

  habilitarEdicionCiudad() {
    this.isFieldEnabledCiudad = !this.isFieldEnabledCiudad;
  }
}
