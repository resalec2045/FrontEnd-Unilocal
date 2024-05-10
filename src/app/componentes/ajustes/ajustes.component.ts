import { Component } from '@angular/core';
import { NavBarComponent } from '../generales/navbar/navbar.component';
import { FooterComponent } from '../generales/footer/footer/footer.component';

@Component({
  selector: 'app-ajustes',
  standalone: true,
  imports: [ NavBarComponent, FooterComponent],
  templateUrl: './ajustes.component.html',
  styleUrl: './ajustes.component.css'
})
export class AjustesComponent {

}
