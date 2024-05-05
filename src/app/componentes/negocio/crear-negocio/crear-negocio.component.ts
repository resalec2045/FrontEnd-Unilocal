import { Component, OnInit } from '@angular/core';
import { RegistroNegocioDTO } from '../../../dto/RegistroNegocioDTO';
import { NegociosService } from '../../../servicios/negocios.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Horario } from '../../../models/Horario';
import { MapaService } from '../../../servicios/mapa.service';

@Component({
  selector: 'app-crear-negocio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './crear-negocio.component.html',
  styleUrl: './crear-negocio.component.css'
})

export class CrearNegocioComponent implements OnInit {
  registroNegocioDTO: RegistroNegocioDTO;
  horarios: Horario[];
  mapaService: MapaService;

  constructor(private negociosService: NegociosService, mapaService: MapaService) {
    this.registroNegocioDTO = new RegistroNegocioDTO();
    this.horarios = [new Horario()];
    this.mapaService = mapaService;
  }

  ngOnInit(): void {
    this.mapaService.crearMapa();
    this.mapaService.agregarMarcador().subscribe((marcador) => {
      this.registroNegocioDTO.ubicacion.latitud = marcador.lat;
      this.registroNegocioDTO.ubicacion.longitud = marcador.lng;
    });
  }

  public crearNegocio() {
    this.registroNegocioDTO.horarios = this.horarios;
    this.negociosService.crear(this.registroNegocioDTO);
    console.log(this.registroNegocioDTO);
  }

  public agregarHorario() {
    this.horarios.push(new Horario());
  }

  public onFileChange(event: Event) {
  }
}