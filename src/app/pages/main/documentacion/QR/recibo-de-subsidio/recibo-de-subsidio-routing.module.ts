import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReciboDeSubsidioPage } from './recibo-de-subsidio.page';

const routes: Routes = [
  {
    path: '',
    component: ReciboDeSubsidioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReciboDeSubsidioPageRoutingModule {}
