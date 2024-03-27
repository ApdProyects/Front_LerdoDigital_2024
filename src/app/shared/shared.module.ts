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
import { InfoFolioComponent } from './components/info-folio/info-folio.component';
import { InfoCatastroComponent } from './components/info-catastro/info-catastro.component';
import { TablaFacturaComponent } from './components/tabla-factura/tabla-factura.component';
import { AltaRfcModalComponent } from './components/alta-rfc-modal/alta-rfc-modal.component';

 


@NgModule({
  declarations: [HeaderComponent, CustomInputComponent, LogoComponent, FooterComponent, PostDetailComponent,InfoFolioComponent, InfoCatastroComponent,TablaFacturaComponent, AltaRfcModalComponent],
  exports: [HeaderComponent, CustomInputComponent, LogoComponent, ReactiveFormsModule, FooterComponent, PostDetailComponent, InfoFolioComponent, InfoCatastroComponent,TablaFacturaComponent, AltaRfcModalComponent ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    FormsModule, RouterModule, 
  ]
})
export class SharedModule { }