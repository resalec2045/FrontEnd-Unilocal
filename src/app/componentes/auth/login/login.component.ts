import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AuthComponent } from '../auth.component';

@Component({
  selector: 'login_component',
  standalone: true,
  imports: [RouterOutlet, AuthComponent],
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css'],
})
export class LoginComponent {
  logo = '../../assets/svg/Logo.png';

  @Output() switchToRegisterEvent = new EventEmitter<void>();

  constructor() {}

  switchToRegister() {
    this.switchToRegisterEvent.emit();
  }

}
