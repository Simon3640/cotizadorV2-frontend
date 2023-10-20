import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuperempleadoGuard } from 'src/app/core/guards/superempleado.guard';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';
import { CrearComponent } from './pages/crear/crear.component';
import { ListaComponent } from './pages/lista/lista.component';
import { VerComponent } from './pages/ver/ver.component';

const routes: Routes = [
  { path: '', 
    component: ListaComponent,
    canActivate:[SuperempleadoGuard]
  }, {
    path: 'crear',
    component: CrearComponent,
    canActivate:[SuperempleadoGuard]
  }, {
    path: 'actualizar/:id',
    component: ActualizarComponent
  }, {
    path: 'ver/:id',
    component: VerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmpleadoRoutingModule { }
