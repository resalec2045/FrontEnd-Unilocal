import { Injectable } from '@angular/core';
import { Ubicacion } from '../../app/models/Ubicacion';
import { Observable } from 'rxjs';
import { ItemNegocioDTO } from '../dto/ItemNegocioDTO';

declare var mapboxgl: any;

@Injectable({
  providedIn: 'root'
})

export class MapaService {
  mapa: any;
  style: string = 'mapbox://styles/mapbox/streets-v11';
  directions: any;
  marcadores: any[];

  constructor() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibWFyaWFuYXZlIiwiYSI6ImNsdnRycDVodDFjcjgyaXBnNmlsbnR5MHoifQ.7ss5JhwM4bPKyqUvWJ5saQ';
    this.marcadores = [];
  }

  public crearMapa() {
    this.mapa = new mapboxgl.Map({
      container: 'mapa',
      style: this.style,
      center: [-72.309, 4.473],
      zoom: 4.5
    });
    this.mapa.addControl(new mapboxgl.NavigationControl());
    this.mapa.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true
      })
    );
  }
  public agregarMarcador(): Observable<any> {
    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;
    return new Observable<any>(observer => {
      mapaGlobal.on('click', function (e: any) {
        marcadores.forEach(marcador => marcador.remove());
        const marcador = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapaGlobal);
        marcadores.push(marcador);
        observer.next(marcador._lngLat);
      });
    });
  }

  public pintarMarcadores(negocios: ItemNegocioDTO[]) {
    negocios.forEach(negocio => {
      new mapboxgl.Marker()
        .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
        .setPopup(new mapboxgl.Popup().setHTML(negocio.nombre))
        .addTo(this.mapa);
    });
  }
}
