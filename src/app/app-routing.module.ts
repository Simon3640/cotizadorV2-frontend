import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shared/pages/login/login.component';
import { EmpleadoGuard } from './core/guards/empleado.guard';

const routes: Routes = [
  {
    path: 'empleados',
    loadChildren: () => import('./modules/empleado/empleado.module')
      .then(m => m.EmpleadoModule),
    canActivate:[EmpleadoGuard]
  }, {
    path: 'login',
    component: LoginComponent
  }, {
    path: 'home',
    redirectTo:'empleados'
  }, {
    path:'',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'empleados'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
