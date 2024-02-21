import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FacturaTablesPage } from './factura-tables.page';

const routes: Routes = [
  {
    path: '',
    component: FacturaTablesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FacturaTablesPageRoutingModule {}
