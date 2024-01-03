import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SalidaParaCorralonPage } from './salida-para-corralon.page';

const routes: Routes = [
  {
    path: '',
    component: SalidaParaCorralonPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalidaParaCorralonPageRoutingModule {}
