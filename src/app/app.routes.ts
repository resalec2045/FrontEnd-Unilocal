import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { PublicacionComponent } from './componentes/publicacion/publicacion.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: InicioComponent },
  { path: 'publicacion/:codigo', component: PublicacionComponent },
  { path: "gestion-negocios", component: GestionNegociosComponent },
  { path: "crear-negocio", component: CrearNegocioComponent },
  { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent },
  { path: '**', pathMatch: "full", redirectTo: "auth" },
];
