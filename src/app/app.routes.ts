import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { GestionNegociosComponent } from './componentes/negocio/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/negocio/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/negocio/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { LoginGuard } from './services/permiso.service';
import { RolesGuard } from './services/roles.service';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent, canActivate: [LoginGuard]},
  { path: 'inicio', component: InicioComponent, canActivate: [LoginGuard]},
  { path: 'detalle-negocio/:codigo', component: DetalleNegocioComponent, canActivate: [LoginGuard]},
  { path: 'gestion-negocios', component: GestionNegociosComponent, canActivate: [RolesGuard], data: { expectedRole: ["MODERADOR"] }},
  { path: 'busqueda/:texto', component: BusquedaComponent, canActivate: [LoginGuard]},
  { path: 'crear-negocio', component: CrearNegocioComponent, canActivate: [RolesGuard], data: { expectedRole: ["USUARIO"] }},
  { path: '**', pathMatch: 'full', redirectTo: 'auth'},
];