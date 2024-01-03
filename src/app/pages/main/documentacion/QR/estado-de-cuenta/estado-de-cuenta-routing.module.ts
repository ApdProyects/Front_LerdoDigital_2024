import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EstadoDeCuentaPage } from './estado-de-cuenta.page';

const routes: Routes = [
  {
    path: '',
    component: EstadoDeCuentaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EstadoDeCuentaPageRoutingModule {}
