import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemNegocioDTO } from '../dto/ItemNegocioDTO';
import { environment } from '../env/environment';

declare var mapboxgl: any;

@Injectable({
  providedIn: 'root',
})
export class MapaService {
  mapa: any;
  style: string = 'mapbox://styles/mapbox/streets-v11';
  directions: any;
  marcadores: any[];

  constructor() {
    if (typeof mapboxgl === 'object') {
      mapboxgl.accessToken = environment.mapBoxToken;
    }
    this.marcadores = [];
  }

  public crearMapa(): boolean {
    if (typeof mapboxgl === 'object') {
      this.mapa = new mapboxgl.Map({
        container: 'mapa',
        style: this.style,
        center: [-75.66726518285189, 4.53978040163297],
        zoom: 9.5,
      });
      this.mapa.addControl(new mapboxgl.NavigationControl());
      this.mapa.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: { enableHighAccuracy: true },
          trackUserLocation: true,
        })
      );
      return true;
    }
    return false;
  }

  public agregarMarcador(): Observable<any> {
    const mapaGlobal = this.mapa;
    const marcadores = this.marcadores;
    return new Observable<any>((observer) => {
      mapaGlobal.on('click', function (e: any) {
        console.log(e.lngLat.lng);
        console.log(e.lngLat.lng);
        console.log(
          'Longitud y latitud cuando se da click. De esta manera se puede guardar'
        );
        marcadores.forEach((marcador) => marcador.remove());
        const marcador = new mapboxgl.Marker()
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .addTo(mapaGlobal);
        marcadores.push(marcador);
        observer.next(marcador._lngLat);
      });
    });
  }

  public pintarMarcadores(negocios: ItemNegocioDTO[]) {
    if (typeof mapboxgl === 'object') {
      console.log('Longitud y latitud específica cuando se carga la vista');
      negocios.forEach((negocio) => {
        new mapboxgl.Marker()
          .setLngLat([negocio.ubicacion.longitud, negocio.ubicacion.latitud])
          .setPopup(new mapboxgl.Popup().setHTML(negocio.nombre))
          .addTo(this.mapa);
      });
    }
  }
}
