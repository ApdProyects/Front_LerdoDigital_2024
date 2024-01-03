import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReciboDePagoPageRoutingModule } from './recibo-de-pago-routing.module';

import { ReciboDePagoPage } from './recibo-de-pago.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReciboDePagoPageRoutingModule,
    SharedModule
  ],
  declarations: [ReciboDePagoPage]
})
export class ReciboDePagoPageModule {}
