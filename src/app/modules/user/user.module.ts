import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmpleadoRoutingModule } from './user-routing.module';
import { ActualizarComponent } from './pages/actualizar/actualizar.component';
import { CrearComponent } from './pages/crear/crear.component';
import { VerComponent } from './pages/ver/ver.component';
import { ListaComponent } from './pages/lista/lista.component';
import { SharedModule } from '@shared/shared.module';
import { ChangePasswordComponent } from './pages/change-password/change-password.component';


@NgModule({
  declarations: [
    ActualizarComponent,
    CrearComponent,
    VerComponent,
    ListaComponent,
    ChangePasswordComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    EmpleadoRoutingModule
  ]
})
export class EmpleadoModule { }
