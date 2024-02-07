import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuyerRoutingModule } from './buyer-routing.module';
import { ViewComponent } from './pages/view/view.component';
import { ListComponent } from './pages/list/list.component';
import { CreateComponent } from './pages/create/create.component';
import { UpdateComponent } from './pages/update/update.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    ViewComponent,
    ListComponent,
    CreateComponent,
    UpdateComponent
  ],
  imports: [
    CommonModule,
    BuyerRoutingModule,
    SharedModule
  ]
})
export class BuyerModule { }
