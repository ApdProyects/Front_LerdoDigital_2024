import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Facturacion2PageRoutingModule } from './facturacion2-routing.module';

import { Facturacion2Page } from './facturacion2.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Facturacion2PageRoutingModule, SharedModule
  ],
  declarations: [Facturacion2Page]
})
export class Facturacion2PageModule {}
