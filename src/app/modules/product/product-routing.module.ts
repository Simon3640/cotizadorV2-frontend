import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { EmpleadoGuard } from 'src/app/core/guards/user.guard';
import { ViewComponent } from './pages/view/view.component';
import { UpdateComponent } from './pages/update/update.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [EmpleadoGuard] },
  { path: 'ver/:id', component: ViewComponent, canActivate: [EmpleadoGuard] },
  {
    path: 'actualizar/:id',
    component: UpdateComponent,
    canActivate: [EmpleadoGuard],
  },
  {
    path: 'crear',
    component: CreateComponent,
    canActivate: [EmpleadoGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductRoutingModule {}
