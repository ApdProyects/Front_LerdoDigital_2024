import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { PhoneCleanupService } from 'src/app/services/phone-cleanup.service';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    correo: new FormControl('', [Validators.required, Validators.email] ),
    contrasena: new FormControl('', [Validators.required]),
    confirmarContrasena: new FormControl('', [Validators.required]),
    usuario: new FormControl('', [Validators.required, Validators.minLength(4)]),
    telefono: new FormControl('',[
      Validators.minLength(10), Validators.maxLength(14)
    ]), 

  });

  constructor(private authService: AuthService,
    private alertController: AlertController,
    public router: Router,
    private phoneCleanupService: PhoneCleanupService
    ) { }

  ngOnInit() {
  }
  
  submit() {
    if (this.form.valid) {
      const formData = this.form.value;

       // Verificar que la contraseña y la confirmación de contraseña sean iguales
       if (formData.contrasena !== formData.confirmarContrasena) {
        this.contrasenaAlert('Error', 'La contraseña y la confirmación de contraseña no coinciden');
        return;
      }
      const cleanPhoneNumber =  this.phoneCleanupService.cleanPhoneNumber(this.form.get('telefono').value);
      console.log(this.phoneCleanupService)
   
      this.authService.registerUser(
        formData.contrasena,
        formData.correo,
        formData.usuario,
        cleanPhoneNumber 
        ).subscribe(
        (res) => {
          console.log('Usuario registrado con éxito', res);
          this.registerAlert('Éxito', 'Usuario registrado con éxito');
          this.redirigirASiguientePagina();


        },
        (error) => {
          console.error('Error al registrar usuario', error);
          this.errorAlert('Éxito', 'Usuario registrado con éxito');

        }
      );
    }
  }



  formatoCelularContacto(control: FormControl) {
    let telefono = control.value;
    // Remover cualquier caracter que no sea un número
    telefono = telefono.replace(/[^\d]/g, '');

    // Verificar la longitud y formatear
    if (telefono.length === 10) {
      telefono = `(${telefono.slice(0, 3)})${telefono.slice(3, 6)}-${telefono.slice(6)}`;
    } else if (telefono.length > 10 && telefono.length <= 14) {
      // Ajustar el formato según la longitud deseada
      telefono = `(${telefono.slice(0, 3)})${telefono.slice(3, 6)}-${telefono.slice(6, 10)}`;
    }

    // Actualizar el valor del control
    control.setValue(telefono);
  }


  ConvertirenMinusculas(control : FormControl){

    if (control.value.length < 120) {
      control.setValue(control.value.toLowerCase());
    }
    control.setValue(control.value.toLowerCase().substring(0, 120));
  }


  async registerAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Registro exitoso.',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  async errorAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un error al registrar el usuario',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  async contrasenaAlert(title: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Hubo un error al registrar el usuario',
      buttons: ['OK']
    });
  
    await alert.present();
  }

  redirigirASiguientePagina() {
    
    console.log('Redirigiendo a la siguiente página...');
    this.router.navigate(['/main/folio']); 

  }
}

