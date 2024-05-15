import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { CrearNegocioComponent } from './componentes/negocio/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/negocio/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { FavoritosComponent } from './componentes/negocio/favoritos/favoritos.component';
import { MisPublicacionesComponent } from './componentes/negocio/mis-publicaciones/mis-publicaciones.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'detalle-negocio/:codigo', component: DetalleNegocioComponent },
  { path: 'favoritos', component: FavoritosComponent},
  { path: 'mis-publicaciones', component: MisPublicacionesComponent},

  { path: 'busqueda/:texto', component: BusquedaComponent },
  { path: 'crear-negocio', component: CrearNegocioComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'auth' },
];
