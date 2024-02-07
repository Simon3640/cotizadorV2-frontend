import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ViewComponent } from './pages/view/view.component';
import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';
import { ListComponent } from './pages/list/list.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ViewComponent,
    CreateComponent,
    UpdateComponent,
    ListComponent
  ],
  imports: [
    SharedModule,
    CommonModule,
    ProductRoutingModule
  ]
})
export class ProductModule { }
