import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaDeIdentidadPage } from './carta-de-identidad.page';

const routes: Routes = [
  {
    path: '',
    component: CartaDeIdentidadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaDeIdentidadPageRoutingModule {}
