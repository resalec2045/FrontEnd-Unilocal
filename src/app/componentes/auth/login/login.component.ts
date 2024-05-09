import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDTO } from '../../../dto/LoginDTO';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'login_component',
  standalone: true,
  imports: [
    RouterOutlet,
    AuthComponent,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css'],
})
export class LoginComponent {
  logo = '../../assets/svg/Logo.png';
  loginDTO: LoginDTO;

  @Output() switchToRegisterEvent = new EventEmitter<void>();
  @Output() switchToRecoveryEvent = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) {
    this.loginDTO = new LoginDTO();
  }

  switchToRegister() {
    this.switchToRegisterEvent.emit();
  }

  switchToRecovery() {
    this.switchToRecoveryEvent.emit();
  }

  loginSubmit() {
    this.authService.login(this.loginDTO).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Inicio de sesión exitoso',
          icon: 'success',
          showConfirmButton: false,
          timer: 1500,
        });
        this.router.navigate(['/inicio']);
      },
      error: (error) => {
        Swal.fire({
          title: 'Error',
          text: error.error.message,
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      },
    });
  }
}
