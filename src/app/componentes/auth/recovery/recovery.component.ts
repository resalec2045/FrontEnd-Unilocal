import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecoveryDTO } from '../../../dto/RecoveryDTO';
import { RouterOutlet } from '@angular/router';

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

  constructor() {
    this.recoveryDTO = new RecoveryDTO();
  }

  recoverySubmit() {
    console.log(this.recoveryDTO.email);
  }

  switchToLogin() {
    this.switchToLoginEvent.emit();
  }
}
