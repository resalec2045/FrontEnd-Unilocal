import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent } from '../generales/navbar/navbar.component';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [RouterOutlet, NavBarComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  imagen: string = '../../../assets/images/image1.jpeg';
  imagen2: string = '../../../assets/images/image2.jpeg';
  imagen3: string = '../../../assets/images/image3.jpeg';
}
