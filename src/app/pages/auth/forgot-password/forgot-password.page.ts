import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    telRecupera: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(10),
      Validators.maxLength(10),
      
    

    ])
  });

  valid: any;
  respuesta: any;
  ban = false;


  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
  }
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async recupera() {


    if (this.form.get('telRecupera').value
    === '' || this.form.get('telRecupera').value
    === undefined) {
        this.alert('Agrega un telefono validar para recuperar la contraseña.');
        return;
    }

    this.respuesta =  await this.authService.getecupera( this.form.get('telRecupera').value
    );
    console.log(this.respuesta);
    await this.respuesta.forEach(async element => {
        this.ban = false;
        if (element.codigo < 0) {
            const alert = this.alertController.create({
                header: 'LERDO DIGITAL', /*+ element.codigoError,*/
                cssClass: 'alertDanger',
                message: element.mensaje + ' Inténtelo nuevamente.',
                buttons: ['Aceptar']
            });
            (await alert).present();
        } else {
            console.log(element);
            const alert = this.alertController.create({
                header: 'LERDO DIGITAL',
                cssClass: 'alertDanger',
                message: element.mensaje,
                buttons: ['Aceptar']
            });
            (await alert).present();
        }
    });

 
}

async alert(msg) {
  const alert = this.alertController.create({
      header: 'LERDO DIGITAL',
      cssClass: 'alertDanger',
      message: msg,
      buttons: ['Aceptar']
  });
  (await alert).present();
} 

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}