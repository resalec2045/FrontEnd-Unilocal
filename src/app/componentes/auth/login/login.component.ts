import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from '../auth.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginDTO } from '../../../dto/LoginDTO';

@Component({
  selector: 'login_component',
  standalone: true,
  imports: [RouterOutlet, AuthComponent, FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css'],
})
export class LoginComponent {
  logo = '../../assets/svg/Logo.png';
  loginDTO: LoginDTO;

  @Output() switchToRegisterEvent = new EventEmitter<void>();
  @Output() switchToRecoveryEvent = new EventEmitter<void>();

  constructor() {
    this.loginDTO = new LoginDTO();
  }

  switchToRegister() {
    this.switchToRegisterEvent.emit();
  }

  switchToRecovery() {
    this.switchToRecoveryEvent.emit();
  }

  loginSubmit() {
    console.log(this.loginDTO.email);
  }
}
