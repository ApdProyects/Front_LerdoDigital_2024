import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaNoInfraccionPageRoutingModule } from './carta-no-infraccion-routing.module';

import { CartaNoInfraccionPage } from './carta-no-infraccion.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaNoInfraccionPageRoutingModule,
    SharedModule
  ],
  declarations: [CartaNoInfraccionPage]
})
export class CartaNoInfraccionPageModule {}
