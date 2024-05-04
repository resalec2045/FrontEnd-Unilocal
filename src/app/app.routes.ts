import { Routes } from '@angular/router';
import { LoginComponent } from './componentes/auth/login/login.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { RegisterComponent } from './componentes/auth/register/register.component';
import { AuthComponent } from './componentes/auth/auth.component';
import { PublicacionComponent } from './componentes/publicacion/publicacion.component';

export const routes: Routes = [
  { path: 'auth', component: AuthComponent },
  { path: 'home', component: InicioComponent },
  { path: 'publicacion/:codigo', component: PublicacionComponent },
  { path: '**', pathMatch: "full", redirectTo: "auth" },
];
