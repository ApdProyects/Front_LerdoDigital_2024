import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrdenPagoPageRoutingModule } from './orden-pago-routing.module';

import { OrdenPagoPage } from './orden-pago.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrdenPagoPageRoutingModule, SharedModule
  ],
  declarations: [OrdenPagoPage]
})
export class OrdenPagoPageModule {}
