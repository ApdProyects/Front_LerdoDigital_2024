import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario-service.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  @Input() User!: string;

  form = new FormGroup({
    usuario: new FormControl('', [Validators.required]),
    correo: new FormControl('', [Validators.required, Validators.email]),
    telefono: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(14),
    ]),
    contrasena: new FormControl('', [Validators.required]),
  });

  mensajeError: string = '';
  mensajeExito: string = '';
  nombreUsuario: string;


  constructor(private authService: AuthService, private alertController: AlertController, private router: Router, private usuarioService: UsuarioService) {}

  ngOnInit() {
    this.usuarioService.usuarioActual$.subscribe(datosUsuario => {
      if (datosUsuario) {
        this.nombreUsuario = datosUsuario.LUS_USUARIO;
      }
    });
  
    this.cargarDatosUsuario();
    
  }

  cargarDatosUsuario(): void {
    const correoUsuario = localStorage.getItem('LUS_CORREO');

    if (correoUsuario) {
      console.log('Correo obtenido desde localStorage:', correoUsuario);

      this.authService.getDatosUsuario(correoUsuario).subscribe({
        next: (data) => {
          /* console.log('Datos del usuario recibidos desde la API:', data); */
          this.form.controls.usuario.setValue(data.Usuario),
            this.form.controls.correo.setValue(data.Correo),
            this.form.controls.telefono.setValue(data.Telefono),
           this.form.controls.contrasena.setValue(data.Contrasena);

          this.form.patchValue({
            usuario: data.Usuario,
            correo: data.Correo,
            telefono: data.Telefono,
            contrasena: data.Contrasena, 
          });

          console.log('Formulario actualizado con los datos del usuario');
        },
        error: (error) =>
          console.error('Error al obtener datos del usuario', error),
      });
    } else {
      console.log('No se encontró el correo del usuario en localStorage.');
    }
  }

  actualizarPerfil(): void {
    if (this.form.valid) {
      this.mostrarAlertaConfirmacion().then((confirmado) => {
        if (confirmado) {
          const datosUsuario = {
            LUS_CLAVE: localStorage.getItem('LUS_CLAVE'), 
            LUS_USUARIO: this.form.value.usuario,
            LUS_TELEFONO: this.form.value.telefono
          };
  
          console.log('Enviando datos al servidor:', datosUsuario);
  
          this.authService.actualizarDatosUsuario(datosUsuario).subscribe({
            next: (res) => {
              console.log('Respuesta exitosa del servidor:', res);
             
              this.router.navigate(['main/servicios']); 
            },
            error: (error) => {
              console.error('Error en la solicitud:', error);
            }
          });
        } else {
          console.log('Actualización cancelada por el usuario.');
        }
      });
    } else {
      console.error('El formulario es inválido.');
    }
  }
  
  async mostrarAlertaConfirmacion(): Promise<boolean> {
    let confirmado = false;
  
    const alerta = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Seguro que quieres cambiar los datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            confirmado = false;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            confirmado = true;
          }
        }
      ]
    });
  
    await alerta.present();
    await alerta.onDidDismiss();
  
    return confirmado;
  }



  ConvertirenMinusculas(control: FormControl) {
    if (control.value.length < 120) {
      control.setValue(control.value.toLowerCase());
    }
    control.setValue(control.value.toLowerCase().substring(0, 120));
  }


  formatoCelularContacto(control: FormControl) {
    if (!control.value) {
        return;
    }

    let telefono = control.value.toString();
    // Primero, quitamos todos los caracteres que no sean dígitos para limpiar la entrada
    telefono = telefono.replace(/\D/g, '');

    if (telefono.length > 10) {
      // Aquí podrías también decidir cortar el valor a los primeros 10 dígitos
       telefono = telefono.slice(0, 10);
      // Y luego aplicar el formato o simplemente devolver sin hacer cambios
      // Para este ejemplo, simplemente retornaremos sin hacer cambios
      return;
  }

    // Luego aplicamos el formato deseado según la longitud del número
    if (telefono.length === 10) {
        // Formato para números de 10 dígitos: (XXX) XXX-XXXX
        telefono = `(${telefono.slice(0, 3)}) ${telefono.slice(3, 6)}-${telefono.slice(6)}`;
    } else if (telefono.length > 10 && telefono.length <= 14) {
        // Formato extendido para números entre 11 y 14 dígitos, incluyendo código de país
        telefono = `+${telefono.slice(0, telefono.length - 10)} (${telefono.slice(telefono.length - 10, telefono.length - 7)}) ${telefono.slice(telefono.length - 7, telefono.length - 4)}-${telefono.slice(telefono.length - 4)}`;
    }

    // Finalmente, actualizamos el valor del control sin emitir un evento de cambio
    // para evitar un ciclo infinito si esto se está llamando dentro de un valueChanges
    control.setValue(telefono);
}


  async Cancelar() {
  
    this.router.navigate(['main/folio']);
  }


}
