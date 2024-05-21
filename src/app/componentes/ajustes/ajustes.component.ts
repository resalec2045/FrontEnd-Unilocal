import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { FooterComponent } from '../generales/footer/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { TokenService } from '../../services/token.service';
import { ClienteService } from '../../services/cliente.service';
import { ImagenesService } from '../../services/imagenes.service';
import { ClienteActualizadoDTO } from '../../dto/ClienteActualizadoDTO';
import { ItemActualizarClienteDTO } from '../../dto/ItemActualizarClienteDTO';
import Swal from 'sweetalert2';

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
    this.clienteService.actualizarCliente(new ItemActualizarClienteDTO(
      this.tokenService.decodePayload().id,
      this.clienteActualizadoDTO!.nombre,
      this.clienteActualizadoDTO!.foto,
      this.clienteActualizadoDTO!.email,
      this.clienteActualizadoDTO!.ciudadResidencia
    )).subscribe(
      {
        next: (data) => {
          Swal.fire({
            icon: 'success',
            title: data.respuesta,
            showConfirmButton: false,
            timer: 1500,
          });
        },
        error: (error) => {
          console.log(error);
        }
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.subirImagen(file);
  }

  public subirImagen(imagen: File) {
    this.imagenesService.subirImagen(imagen).subscribe({
      next: (response) => {
        this.clienteActualizadoDTO!.foto = response.respuesta.url;
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

  public eliminarCuenta() {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar tu cuenta?',
      text: 'No podrás recuperar tu cuenta si la eliminas',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const { id } = this.tokenService.decodePayload();
        this.clienteService.eliminarCliente(id).subscribe({
          next: (data) => {
            Swal.fire({
              icon: 'success',
              title: data.respuesta,
              showConfirmButton: false,
              timer: 1500,
            });
            this.tokenService.logout();
          },
          error: (error) => {
            console.log(error);
          },
        });
      }
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
