import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FolioPageRoutingModule } from './folio-routing.module';

import { FolioPage } from './folio.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FolioPageRoutingModule,
    SharedModule
  ],
  declarations: [FolioPage]
})
export class FolioPageModule {}
