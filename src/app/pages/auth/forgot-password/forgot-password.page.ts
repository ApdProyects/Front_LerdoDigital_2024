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
    telefono: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
      Validators.minLength(10),
      Validators.maxLength(10)
    ])
  });

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    public router: Router
  ) { }

  ngOnInit() {
  }

  async submit() {
    console.log('Submit button clicked');
  
    const loading = await this.loadingController.create({
      message: 'Cargando',
    });
  
    await loading.present();
  
    console.log('Telefono:', this.form.value.telefono);
  
    this.authService.forgotPass(this.form.value.telefono).subscribe(
      (res) => {
        console.log('Contraseña restablecida con éxito', res);
        this.showAlert('Éxito', 'Contraseña restablecida con éxito');
      },
      (error) => {
        console.error('Error al restablecer la contraseña', error);
        this.showAlert('Error', 'Hubo un error al restablecer la contraseña');
      }
    );
  
    await loading.dismiss();
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