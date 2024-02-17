import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperuserGuard } from 'src/app/core/guards/superuser.guard';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';
import { CrearComponent } from './pages/crear/crear.component';
import { ListaComponent } from './pages/lista/lista.component';
import { VerComponent } from './pages/ver/ver.component';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';

const routes: Routes = [
  { path: '', component: ListaComponent, canActivate: [SuperuserGuard] },
  {
    path: 'crear',
    component: CrearComponent,
    canActivate: [SuperuserGuard],
  },
  {
    path: 'actualizar/:id',
    component: ActualizarComponent,
  },
  {
    path: 'ver/:id',
    component: VerComponent,
  },
  {
    path: 'change-password/:id',
    component: ChangePasswordComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpleadoRoutingModule {}
