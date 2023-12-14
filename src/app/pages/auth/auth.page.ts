import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController,  } from '@ionic/angular';
import { Router } from '@angular/router';



@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    usuario: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    public LoadingController: LoadingController,
    public router: Router
  ) {}

  ngOnInit() {}

  /*  debugger; */
  async submit() {
    if (this.form.valid) {
      const usuario = this.form.get('usuario').value;
      const password = this.form.get('password').value;
  
      const loading = await this.LoadingController.create({
        message: 'Cargando',
      });
      await loading.present();
  
      this.authService.login(usuario, password).subscribe(
        async (res: any) => {
          console.log('Respuesta del servicio:', res);
  
          if (res === null) {
            console.log('Respuesta nula');
            this.mostrarAlerta('Inténtalo de nuevo', 'Usuario o contraseña incorrectos.');
          } else if (res.codigo === -1) {
            console.log('Usuario no registrado');
            this.mostrarAlerta('Usuario no registrado', 'El usuario no existe en el sistema.');
          } else if (res.LRO_CLAVE === 2) {
            console.log('Respuesta exitosa');
            this.mostrarMensajeBienvenida();
            this.redirigirASiguientePagina();
          }
  
          await loading.dismiss();
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);
          loading.dismiss();
          this.mostrarAlerta('Inténtalo de nuevo', 'Se produjo un error en el inicio de sesión.');
        }
      );
    } else {
      console.error(
        'Formulario incompleto:',
        'Por favor, completa el formulario correctamente.'
      );
    }
  }
  
  
  async mostrarMensajeBienvenida() {
    const alert = await this.alertController.create({
      header: '¡Bienvenido!',
      message: 'Inicio de sesión exitoso.',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'No esta registrado',
      buttons: ['OK']
    });
  
    await alert.present();
  }
  
  redirigirASiguientePagina() {
    
    console.log('Redirigiendo a la siguiente página...');
    this.router.navigate(['/main/folio']); 

  }
}  