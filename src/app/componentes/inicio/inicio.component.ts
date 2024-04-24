import { Component } from '@angular/core';
import { NavBarComponent } from '../generales/navbar/navbar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {

}
