import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children:[
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
      },
    
      {
        path: 'servicios',
        loadChildren: () => import('../auth/auth.module').then( m => m.AuthPageModule)
      },
      {
        path: 'facturacion',
        loadChildren: () => import('./facturacion/facturacion.module').then( m => m.FacturacionPageModule)
      },
      {
        path: 'folio',
        loadChildren: () => import('./folio/folio.module').then( m => m.FolioPageModule)
      },
    ]
  },
 




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
