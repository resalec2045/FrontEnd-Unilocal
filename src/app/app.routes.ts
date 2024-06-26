import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { CrearNegocioComponent } from './componentes/negocio/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/negocio/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { LoginGuard } from './services/permiso.service';
import { RolesGuard } from './services/roles.service';
import { FavoritosComponent } from './componentes/negocio/favoritos/favoritos.component';
import { MisPublicacionesComponent } from './componentes/negocio/mis-publicaciones/mis-publicaciones.component';
import { ConfirmpasswordComponent } from './componentes/auth/confirmpassword/confirmpassword.component';
import { NegociosModeradorComponent } from './componentes/negocio/negocios-moderador/negocios-moderador.component';
import { RevisionesNegocioModeradorComponent } from './componentes/negocio/revisiones-negocio-moderador/revisiones-negocio-moderador.component';
import { AjustesComponent } from './componentes/ajustes/ajustes.component';
import { EditarNegocioComponent } from './componentes/negocio/editar-negocio/editar-negocio.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'inicio', component: InicioComponent },
  { path: 'detalle-negocio/:codigo', component: DetalleNegocioComponent },
  {
    path: 'favoritos',
    component: FavoritosComponent,
    canActivate: [RolesGuard],
  },
  {
    path: 'mis-publicaciones',
    component: MisPublicacionesComponent,
    canActivate: [RolesGuard],
  },
  { path: 'cambiar-contrasena/:email', component: ConfirmpasswordComponent },
  { path: 'ajustes', component: AjustesComponent, canActivate: [RolesGuard] },
  {
    path: 'editar-negocio/:codigo',
    component: EditarNegocioComponent,
    canActivate: [RolesGuard],
  },

  {
    path: 'crear-negocio',
    component: CrearNegocioComponent,
    canActivate: [RolesGuard],
  },
  {
    path: 'negocios-moderador',
    component: NegociosModeradorComponent,
    canActivate: [RolesGuard],
  },
  { path: 'busqueda/:texto', component: BusquedaComponent },
  {
    path: 'revisiones-negocio-moderador/:codigo',
    component: RevisionesNegocioModeradorComponent,
    canActivate: [RolesGuard],
  },
  { path: '**', pathMatch: 'full', redirectTo: 'auth' },
];
