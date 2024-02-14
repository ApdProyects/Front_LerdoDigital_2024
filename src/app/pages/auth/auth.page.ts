import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {
  AlertController,
  IonicSafeString,
  LoadingController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SessionService } from 'src/app/services/session-service.service';

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
    public router: Router,
    private platform: Platform,
    public toastController: ToastController,
    private sessionService: SessionService
  ) {}

  ngOnInit() {}

  /*  debugger; */
  async submit() {
    if (this.form.valid) {
      const usuario = this.form.get('usuario').value;
      const password = this.form.get('password').value;
      

      this.authService.login(usuario, password).subscribe(
        async (res: any) => {
          if (res === null) {
            // Manejar caso de respuesta nula del servidor
            console.log('Respuesta nula del servidor');
            // Aquí puedes mostrar una alerta o manejar de otra manera
          } else if (res.codigo === -1) {
            // Usuario no registrado
            console.log('Usuario no registrado');
            this.mostrarAlertaNoRegistro(
              'Usuario no registrado',
              'No se encontró una cuenta con estas credenciales. Por favor, verifica tus datos o regístrate.'
            );
          } else if (res.LRO_CLAVE === 2) {
            console.log('Respuesta exitosa');
            localStorage.setItem('LRO_CLAVE', res.LRO_CLAVE);
            localStorage.setItem('LUS_CORREO', res.LUS_CORREO);
            localStorage.setItem('LUS_CLAVE', res.LUS_CLAVE);
            this.sessionService.cargarNombreUsuario(res.LUS_CORREO);

            console.log(
              'LRO_CLAVE almacenado:',
              localStorage.getItem('LRO_CLAVE')
            );
            console.log(
              'LUS_CORREO almacenado:',
              localStorage.getItem('LUS_CORREO')
            );
            console.log(
              'LUS_CLAVE almacenado:',
              localStorage.getItem('LUS_CLAVE')
            );
            

            this.mostrarMensajeBienvenida();
           
            this.redirigirASiguientePagina();
          }
        },
        (error) => {
          console.error('Error en el inicio de sesión:', error);

          this.mostrarAlerta(
            'Inténtalo de nuevo',
            'Se produjo un error en el inicio de sesión.'
          );
        }
      );
    } else {
      console.error(
        'Formulario incompleto:',
        'Por favor, completa el formulario correctamente.'
      );
    }
  }

  async validatePasswordcaracteres(password: FormControl) {
    const re = /^[a-zA-Z0-9]+$/;

    console.log(re.test(String(password)));
    return re.test(String(password));
  }

  ConvertirenMinusculas(control : FormControl){

    if (control.value.length < 120) {
      control.setValue(control.value.toLowerCase());
    }
    control.setValue(control.value.toLowerCase().substring(0, 120));
  }


  async mostrarMensajeBienvenida() {
    Swal.fire({
      title: 'Bienvenido',
      icon: 'success',
      timer: 1000,
      showConfirmButton: false,
    });
    document.body.classList.remove('swal2-height-auto');
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
    });
    document.body.classList.remove('swal2-height-auto');
  }

  async mostrarAlertaIncorrecto(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
    });
    document.body.classList.remove('swal2-height-auto');
  }

  async mostrarAlertaNoRegistro(titulo: string, mensaje: string) {
    Swal.fire({
      title: titulo,
      text: mensaje,
      icon: 'error',
      timer: 3000,
      showConfirmButton: false,
    });
    document.body.classList.remove('swal2-height-auto');
  }

  redirigirASiguientePagina() {
    console.log('Redirigiendo a la siguiente página...');
    this.router.navigate(['/main/folio']);
    
  }

  async doRefresh(event: any) {
    if (this.platform.is('mobile')) {
      setTimeout(async () => {
        // ...
        this.form.reset();

        event.target.complete();

        const toast = await this.toastController.create({
          message: 'Los datos han sido reiniciados.',
          duration: 1500,
          position: 'bottom',
          color: 'light'
        });
        toast.present();
      }, 2000);
    } else {
      event.target.complete();
    }
  }
}
