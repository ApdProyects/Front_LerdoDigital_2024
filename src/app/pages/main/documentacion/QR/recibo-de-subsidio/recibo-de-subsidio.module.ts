import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReciboDeSubsidioPageRoutingModule } from './recibo-de-subsidio-routing.module';

import { ReciboDeSubsidioPage } from './recibo-de-subsidio.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReciboDeSubsidioPageRoutingModule,
    SharedModule
  ],
  declarations: [ReciboDeSubsidioPage]
})
export class ReciboDeSubsidioPageModule {}
