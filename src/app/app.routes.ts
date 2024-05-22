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
    data: { expectedRole: ['MODERADOR', 'USUARIO'] },
  },
  {
    path: 'mis-publicaciones',
    component: MisPublicacionesComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['MODERADOR', 'USUARIO'] },
  },
  { path: 'cambiar-contrasena/:email', component: ConfirmpasswordComponent },
  {
    path: 'ajustes',
    component: AjustesComponent,
    data: { expectedRole: ['MODERADOR', 'USUARIO'] },
  },
  {
    path: 'editar-negocio/:codigo',
    component: EditarNegocioComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['MODERADOR', 'USUARIO'] },
  },
  {
    path: 'crear-negocio',
    component: CrearNegocioComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['MODERADOR', 'USUARIO'] },
  },
  {
    path: 'negocios-moderador',
    component: NegociosModeradorComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['MODERADOR'] },
  },
  { path: 'busqueda/:texto', component: BusquedaComponent },
  {
    path: 'revisiones-negocio-moderador/:codigo',
    component: RevisionesNegocioModeradorComponent,
    canActivate: [RolesGuard],
    data: { expectedRole: ['MODERADOR'] },
  },
  { path: '**', pathMatch: 'full', redirectTo: 'auth' },
];
