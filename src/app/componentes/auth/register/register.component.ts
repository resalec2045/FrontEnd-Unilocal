import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RegisterDTO } from '../../../dto/RegisterDTO';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'register_component',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css'],
})
export class RegisterComponent {
  logo = '../../assets/svg/Logo.png';
  registerDTO: RegisterDTO;

  @Output() switchToLoginEvent = new EventEmitter<void>();

  constructor(
    private authService: AuthService,
  ) {
    this.registerDTO = new RegisterDTO();
  }

  switchToLogin() {
    this.switchToLoginEvent.emit();
  }

  registerSubmit() {
    console.log(this.registerDTO);
    
    this.authService.registrarCliente(this.registerDTO).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Registro exitoso',
          text: 'Se ha registrado correctamente',
          icon: 'success',
          confirmButtonText: 'Iniciar sesión',
        });
        
        this.switchToLogin();
      },
      error: (error) => {
        console.error(error);
      },
    })
  }
}
