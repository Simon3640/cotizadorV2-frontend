import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleRoutingModule } from './sale-routing.module';
import { ListComponent } from './pages/list/list.component';
import { ViewComponent } from './pages/view/view.component';
import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';
import { SharedModule } from '@shared/shared.module';
import { ProductSaleComponent } from './components/product-sale/product-sale.component';


@NgModule({
  declarations: [
    ListComponent,
    ViewComponent,
    CreateComponent,
    UpdateComponent,
    ProductSaleComponent
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    SharedModule
  ]
})
export class SaleModule { }
