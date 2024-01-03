import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReciboDePagoPage } from './recibo-de-pago.page';

const routes: Routes = [
  {
    path: '',
    component: ReciboDePagoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReciboDePagoPageRoutingModule {}
