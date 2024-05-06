import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDTO } from '../../../dto/LoginDTO';
import { unilocalApi } from '../../../api/unilocalApi';
import { HttpClientModule } from '@angular/common/http';
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

  constructor(private unilocalApi: unilocalApi, private router: Router) {
    this.loginDTO = new LoginDTO();
  }

  switchToRegister() {
    this.switchToRegisterEvent.emit();
  }

  switchToRecovery() {
    this.switchToRecoveryEvent.emit();
  }

  loginSubmit() {
    this.unilocalApi.post<any>('auth/login-cliente', this.loginDTO).subscribe(
      (response) => {
        this.unilocalApi.setAuthToken(response.respuesta.token);
        this.router.navigate(['/inicio']);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.respuesta,
        });
      }
    );
  }
}
