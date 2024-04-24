import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgIf } from '@angular/common';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavBarComponent,
    LoginComponent,
    RegisterComponent,
    NgIf,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent {
  logo = '../../assets/Logo.png';

  selectPage!: string;

  constructor() {
    this.selectPage = 'login';
  }

  setSelectPage(page: string) {
    this.selectPage = page;
  }
}
