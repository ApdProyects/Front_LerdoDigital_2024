import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { PhoneCleanupService } from 'src/app/services/phone-cleanup.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {
  form = new FormGroup({
    telRecupera: new FormControl('', [Validators.required]),
  });

  valid: any;
  respuesta: any;
  ban = false;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router,
    private phoneCleanupService: PhoneCleanupService
  ) {}

  ngOnInit() {}
  handleRefresh(event) {
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);
  }

  async recupera() {
    if (
      this.form.get('telRecupera').value === '' ||
      this.form.get('telRecupera').value === undefined
    ) {
      this.alert('Agrega un telefono validar para recuperar la contraseña.');
      return;
    }

    const cleanPhoneNumber =  this.phoneCleanupService.cleanPhoneNumber(this.form.get('telRecupera').value);
    console.log(this.phoneCleanupService)


    this.respuesta = await this.authService.getecupera(cleanPhoneNumber
     );
    console.log(this.respuesta);
    await this.respuesta.forEach(async (element) => {
      this.ban = false;
      if (element.codigo < 0) {
        const alert = this.alertController.create({
          header: 'LERDO DIGITAL' /*+ element.codigoError,*/,
          cssClass: 'alertDanger',
          message: element.mensaje + ' Inténtelo nuevamente.',
          buttons: ['Aceptar'],
        });
        (await alert).present();
      } else {
        console.log(element);
        const alert = this.alertController.create({
          header: 'LERDO DIGITAL',
          cssClass: 'alertDanger',
          message: element.mensaje,
          buttons: ['Aceptar'],
        });
        (await alert).present();
      }
    });
  }

  formatoCelularContacto(control: FormControl) {
    if (!control.value) {
      return;
  }

  let telefono = control.value.toString();
  telefono = telefono.replace(/\D/g, '');

  if (telefono.length > 10) {
     telefono = telefono.slice(0, 10);

    return;
}
    // Verificar la longitud y formatear
    if (telefono.length === 10) {
      telefono = `(${telefono.slice(0, 3)}) ${telefono.slice(3, 6)}-${telefono.slice(6)}`;
  } else if (telefono.length > 10 && telefono.length <= 14) {
      telefono = `+${telefono.slice(0, telefono.length - 10)} (${telefono.slice(telefono.length - 10, telefono.length - 7)}) ${telefono.slice(telefono.length - 7, telefono.length - 4)}-${telefono.slice(telefono.length - 4)}`;
  }

    // Actualizar el valor del control
    control.setValue(telefono);
  }


  async alert(msg) {
    const alert = this.alertController.create({
      header: 'LERDO DIGITAL',
      cssClass: 'alertDanger',
      message: msg,
      buttons: ['Aceptar'],
    });
    (await alert).present();
  }

  async showAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: title,
      message: message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
