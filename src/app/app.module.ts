import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';


/* <================ Firebase ===============> */
/* import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment'; */


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule,
    IonicModule.forRoot({ mode: 'md' }),
    AppRoutingModule,HttpClientModule,
  /*   AngularFireModule.initializeApp(environment.firebaseConfig) */], 
    
  providers: [{
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule { }
