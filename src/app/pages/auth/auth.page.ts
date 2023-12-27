import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {
  AlertController,
  IonicSafeString,
  LoadingController,
} from '@ionic/angular';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

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

      this.authService.login(usuario, password).subscribe(
        async (res: any) => {
          console.log('Respuesta del servicio:', res);

          if (res === null) {
            console.log('Respuesta nula');
            this.mostrarAlerta(
              'Inténtalo de nuevo',
              'Usuario o contraseña incorrectos.'
            );
          } else if (res.codigo === -1) {
            console.log('Usuario no registrado');

            this.mostrarAlerta(
              'Usuario no registrado',
              'El usuario no existe en el sistema.'
            );
          } else if (res.LRO_CLAVE === 2) {
            console.log('Respuesta exitosa');
            localStorage.setItem('LRO_CLAVE', res.LRO_CLAVE);
            localStorage.setItem('LUS_CORREO', res.LUS_CORREO);
            localStorage.setItem('LUS_CLAVE', res.LUS_CLAVE);

            console.log('LRO_CLAVE almacenado:', localStorage.getItem('LRO_CLAVE'));
            console.log('LUS_CORREO almacenado:', localStorage.getItem('LUS_CORREO'));
            console.log('LUS_CLAVE almacenado:', localStorage.getItem('LUS_CLAVE'));

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
      timer: 2000,
      showConfirmButton: false,
    });
    document.body.classList.remove('swal2-height-auto');
  }

  redirigirASiguientePagina() {
    console.log('Redirigiendo a la siguiente página...');
    this.router.navigate(['/main/folio']);
  }
}
