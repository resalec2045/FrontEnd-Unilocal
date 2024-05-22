import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecoveryDTO } from '../../../dto/RecoveryDTO';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { NavBarComponent } from '../../generales/navbar/navbar.component';
import { RecuperacionContrasenaDTO } from '../../../dto/RecuperacionContrasenaDTO';

@Component({
  selector: 'app-confirmpassword',
  standalone: true,
  templateUrl: './confirmpassword.component.html',
  imports: [RouterOutlet, FormsModule, CommonModule, NavBarComponent],
  styleUrls: ['../auth.component.css'],
})
export class ConfirmpasswordComponent {
  logo = '../../assets/svg/Logo.png';
  recuperacionContrasenaDTO: RecuperacionContrasenaDTO;
  email: string;

  @Output() switchToLoginEvent = new EventEmitter<void>();

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.recuperacionContrasenaDTO = new RecuperacionContrasenaDTO();
    this.email = '';
    this.route.params.subscribe((params) => {
      this.email = params['email'];
    });
  }

  validatePassword(contrasena: string, confirmarContrasena: string) {
    console.log(this.email);
    this.recuperacionContrasenaDTO.email = this.email;
    if (contrasena === confirmarContrasena && contrasena.length > 7) {
      this.recoverySubmit(contrasena);
    } else {
      Swal.fire({
        title: '¡ERROR!',
        text: 'Las contraseñas no coinciden. Intenta nuevamente. Además, recuerda que debe tener mínimo 7 dígitos',
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  }

  recoverySubmit(contrasena: string) {
    this.recuperacionContrasenaDTO.contrasenaNueva = contrasena;
    console.log(this.recuperacionContrasenaDTO);
    this.authService
      .reestablecerContrasena(this.recuperacionContrasenaDTO)
      .subscribe({
        next: (response) => {
          Swal.fire({
            title: '¡Hecho!',
            text: 'Contraseña actualizada con éxito. Ya puede cerrar esta ventana.',
            icon: 'success',
            confirmButtonText: 'Aceptar',
          });
        },
        error: (error) => {
          Swal.fire({
            title: '¡ERROR!',
            text: 'Lo sentimos. Por favor intenta nuevamente, más tarde.',
            icon: 'error',
            confirmButtonText: 'Aceptar',
          });
        },
      });
  }

  switchToLogin() {
    this.switchToLoginEvent.emit();
  }
}
