import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SalidaParaCorralonPageRoutingModule } from './salida-para-corralon-routing.module';

import { SalidaParaCorralonPage } from './salida-para-corralon.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SalidaParaCorralonPageRoutingModule,
    SharedModule
  ],
  declarations: [SalidaParaCorralonPage]
})
export class SalidaParaCorralonPageModule {}
