import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { RegisterDTO } from '../../../dto/RegisterDTO';

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

  constructor() {
    this.registerDTO = new RegisterDTO();
  }

  switchToLogin() {
    this.switchToLoginEvent.emit();
  }

  registerSubmit() {
    console.log(this.registerDTO.email);
  }
}
