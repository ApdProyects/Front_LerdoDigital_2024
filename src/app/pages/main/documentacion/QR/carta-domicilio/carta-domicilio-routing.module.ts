import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CartaDomicilioPage } from './carta-domicilio.page';

const routes: Routes = [
  {
    path: '',
    component: CartaDomicilioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CartaDomicilioPageRoutingModule {}
