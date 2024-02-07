import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './pages/create/create.component';
import { ListComponent } from './pages/list/list.component';
import { UpdateComponent } from './pages/update/update.component';
import { EmpleadoGuard } from 'src/app/core/guards/user.guard';
import { ViewComponent } from './pages/view/view.component';

const routes: Routes = [
  { path: '', component: ListComponent, canActivate: [EmpleadoGuard] },
  { path: 'crear', component: CreateComponent, canActivate: [EmpleadoGuard] },
  { path: 'actualizar/:id', component: UpdateComponent, canActivate: [EmpleadoGuard] },
  { path: 'ver/:id', component: ViewComponent, canActivate: [EmpleadoGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyerRoutingModule {}
