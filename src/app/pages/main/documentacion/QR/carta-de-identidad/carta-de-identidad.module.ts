import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaDeIdentidadPageRoutingModule } from './carta-de-identidad-routing.module';

import { CartaDeIdentidadPage } from './carta-de-identidad.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaDeIdentidadPageRoutingModule,
    SharedModule
  ],
  declarations: [CartaDeIdentidadPage]
})
export class CartaDeIdentidadPageModule {}
