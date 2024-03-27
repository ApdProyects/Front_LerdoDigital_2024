import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Facturacion2Page } from './facturacion2.page';

const routes: Routes = [
  {
    path: '',
    component: Facturacion2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Facturacion2PageRoutingModule {}
