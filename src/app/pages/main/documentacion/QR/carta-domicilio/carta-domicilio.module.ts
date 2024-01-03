import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CartaDomicilioPageRoutingModule } from './carta-domicilio-routing.module';

import { CartaDomicilioPage } from './carta-domicilio.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CartaDomicilioPageRoutingModule,
    SharedModule
  ],
  declarations: [CartaDomicilioPage]
})
export class CartaDomicilioPageModule {}
