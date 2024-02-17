import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '@shared/pages/login/login.component';
import { EmpleadoGuard } from './core/guards/user.guard';
import { RecoverPasswordComponent } from '@shared/pages/recover-password/recover-password.component';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/user/user.module').then((m) => m.EmpleadoModule),
    canActivate: [EmpleadoGuard],
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./modules/product/product.module').then((m) => m.ProductModule),
    canActivate: [EmpleadoGuard],
  },
  {
    path: 'sales',
    loadChildren: () =>
      import('./modules/sale/sale.module').then((m) => m.SaleModule),
    canActivate: [EmpleadoGuard],
  },
  {
    path: 'buyers',
    loadChildren: () =>
      import('./modules/buyer/buyer.module').then((m) => m.BuyerModule),
    canActivate: [EmpleadoGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'recover-password',
    component: RecoverPasswordComponent,
  },
  {
    path: 'home',
    redirectTo: 'users',
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'users',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
