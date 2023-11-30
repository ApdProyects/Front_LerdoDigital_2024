import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FolioPage } from './folio.page';

const routes: Routes = [
  {
    path: '',
    component: FolioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FolioPageRoutingModule {}
