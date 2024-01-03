import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaNoInfraccionPage } from './carta-no-infraccion.page';

const routes: Routes = [
  {
    path: '',
    component: CartaNoInfraccionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaNoInfraccionPageRoutingModule {}
