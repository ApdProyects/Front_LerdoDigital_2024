import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ForgotPasswordPageRoutingModule } from './forgot-password-routing.module';

import { ForgotPasswordPage } from './forgot-password.page';
import { SharedModule } from "../../../shared/shared.module";

@NgModule({
    declarations: [ForgotPasswordPage],
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ForgotPasswordPageRoutingModule,
        SharedModule
    ]
})
export class ForgotPasswordPageModule {}
