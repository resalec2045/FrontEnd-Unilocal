import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecoveryDTO } from '../../../dto/RecoveryDTO';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'recovery_component',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './recovery.component.html',
  styleUrl: '../auth.component.css',
})
export class RecoveryComponent {
  logo = '../../assets/svg/Logo.png';
  recoveryDTO: RecoveryDTO;

  @Output() switchToLoginEvent = new EventEmitter<void>();

  constructor(private authService: AuthService) {
    this.recoveryDTO = new RecoveryDTO();
  }

  recoverySubmit(email: String) {
    this.authService.enviarLinkRecuperacionContrasena(email).subscribe({
      next: (response) => {
        Swal.fire({
          title: '¡Hecho!',
          text: 'Revisa tu correo, te hemos enviado un link para que accedas y recuperes tu contraseña.',
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });
      },
      error: (error) => {
        Swal.fire({
          title: '¡ERROR!',
          text: 'El correo ingresado no está registrado. ',
          icon: 'error',
          confirmButtonText: 'Aceptar',
        });
      },
    });
    console.log(this.recoveryDTO.email);
  }

  switchToLogin() {
    this.switchToLoginEvent.emit();
  }
}
