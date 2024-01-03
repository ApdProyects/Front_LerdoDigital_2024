import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadoDeCuentaPageRoutingModule } from './estado-de-cuenta-routing.module';

import { EstadoDeCuentaPage } from './estado-de-cuenta.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadoDeCuentaPageRoutingModule,
    SharedModule
  ],
  declarations: [EstadoDeCuentaPage]
})
export class EstadoDeCuentaPageModule {}
