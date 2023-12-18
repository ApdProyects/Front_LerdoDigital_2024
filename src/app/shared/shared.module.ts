import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { CustomInputComponent } from './components/custom-input/custom-input.component';
import { LogoComponent } from './components/logo/logo.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { RouterModule } from '@angular/router';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { RfcDetailComponent } from './rfc-detail/rfc-detail.component';
import { FacturaFolioRfcComponent } from './factura-folio-rfc/factura-folio-rfc.component';
import { InfoFolioComponent } from './components/info-folio/info-folio.component';
import { InfoCatastroComponent } from './components/info-catastro/info-catastro.component';

 


@NgModule({
  declarations: [HeaderComponent, CustomInputComponent, LogoComponent, FooterComponent, PostDetailComponent, RfcDetailComponent, FacturaFolioRfcComponent,InfoFolioComponent, InfoCatastroComponent],
  exports: [HeaderComponent, CustomInputComponent, LogoComponent, ReactiveFormsModule, FooterComponent, PostDetailComponent,RfcDetailComponent, FacturaFolioRfcComponent, InfoFolioComponent, InfoCatastroComponent ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule, RouterModule, 
  ]
})
export class SharedModule { }