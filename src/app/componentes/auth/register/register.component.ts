import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'register_component',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './register.component.html',
  styleUrls: ['../auth.component.css'],
})
export class RegisterComponent {
  logo = '../../assets/Logo.png';

  @Output() switchToLoginEvent = new EventEmitter<void>();

  constructor() {}

  switchToLogin() {
    this.switchToLoginEvent.emit();
  }

}
