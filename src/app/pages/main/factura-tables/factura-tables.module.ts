import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FacturaTablesPageRoutingModule } from './factura-tables-routing.module';

import { FacturaTablesPage } from './factura-tables.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FacturaTablesPageRoutingModule,
    SharedModule, 
  ],
  declarations: [FacturaTablesPage]
})
export class FacturaTablesPageModule {
  
}
