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
        path: 'facturacion/:IIN_CLAVE',
        loadChildren: () => import('./facturacion/facturacion.module').then( m => m.FacturacionPageModule)
      },
      
      {
        path: 'folio',
        loadChildren: () => import('./folio/folio.module').then( m => m.FolioPageModule)
      },
      {
        path: 'perfil',
        loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
      }, 
       {
        path: 'factura-tables',
        loadChildren: () => import('./factura-tables/factura-tables.module').then( m => m.FacturaTablesPageModule)
      }, 
    ]
  },
  {
    path: 'documentacion/QR/carta-de-identidad',
    loadChildren: () => import('./documentacion/QR/carta-de-identidad/carta-de-identidad.module').then( m => m.CartaDeIdentidadPageModule)
  },
  {
    path: 'documentacion/QR/carta-domicilio',
    loadChildren: () => import('./documentacion/QR/carta-domicilio/carta-domicilio.module').then( m => m.CartaDomicilioPageModule)
  },
  {
    path: 'documentacion/QR/carta-no-infraccion',
    loadChildren: () => import('./documentacion/QR/carta-no-infraccion/carta-no-infraccion.module').then( m => m.CartaNoInfraccionPageModule)
  },
  {
    path: 'documentacion/QR/estado-de-cuenta',
    loadChildren: () => import('./documentacion/QR/estado-de-cuenta/estado-de-cuenta.module').then( m => m.EstadoDeCuentaPageModule)
  },
  {
    path: 'documentacion/QR/multas',
    loadChildren: () => import('./documentacion/QR/multas/multas.module').then( m => m.MultasPageModule)
  },
  {
    path: 'documentacion/QR/:IIN_CLAVE',
    loadChildren: () => import('./documentacion/QR/orden-pago/orden-pago.module').then( m => m.OrdenPagoPageModule)
  },
  {
    path: 'documentacion/QR/recibo-de-pago',
    loadChildren: () => import('./documentacion/QR/recibo-de-pago/recibo-de-pago.module').then( m => m.ReciboDePagoPageModule)
  },
  {
    path: 'documentacion/QR/recibo-de-subsidio',
    loadChildren: () => import('./documentacion/QR/recibo-de-subsidio/recibo-de-subsidio.module').then( m => m.ReciboDeSubsidioPageModule)
  },
  {
    path: 'documentacion/QR/salida-para-corralon',
    loadChildren: () => import('./documentacion/QR/salida-para-corralon/salida-para-corralon.module').then( m => m.SalidaParaCorralonPageModule)
  },
  {
    path: 'perfil',
    loadChildren: () => import('./perfil/perfil.module').then( m => m.PerfilPageModule)
  },
  {
    path: 'factura-tables',
    loadChildren: () => import('./factura-tables/factura-tables.module').then( m => m.FacturaTablesPageModule)
  },  {
    path: 'facturacion2',
    loadChildren: () => import('./facturacion2/facturacion2.module').then( m => m.Facturacion2PageModule)
  },




 




];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
