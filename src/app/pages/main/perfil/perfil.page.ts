import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(): void {
    const correoUsuario = localStorage.getItem('LUS_CORREO');

    if (correoUsuario) {
      console.log('Correo obtenido desde localStorage:', correoUsuario);

      this.authService.getDatosUsuario(correoUsuario).subscribe({
        next: (data) => {
          console.log('Datos del usuario recibidos desde la API:', data);
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

  // En tu componente de perfil
  actualizarDatosUsuario(): void {
    const datosUsuario = {
      correoOriginal: this.form.value.correo, // Asume que el correo original está en el formulario
      nuevoCorreo: this.form.value.correo, // Puedes ajustar estos nombres según tu formulario
      nuevoTelefono: this.form.value.telefono,
      nuevoUsuario: this.form.value.usuario,
      nuevaContrasena: this.form.value.contrasena,
    };

    this.authService.actualizarDatosUsuario(datosUsuario).subscribe({
      next: (respuesta) => {
        console.log('Datos del usuario actualizados con éxito', respuesta);
        this.mensajeExito = 'Datos actualizados correctamente.';
        // Limpiar mensajeError si estaba presente
        this.mensajeError = '';
      },
      error: (error) => {
        console.error('Error al actualizar los datos del usuario', error);
        this.mensajeError =
          'Ocurrió un error al actualizar los datos. Por favor, intenta nuevamente.';
        // Limpiar mensajeExito si estaba presente
        this.mensajeExito = '';
      },
    });
  }

  ConvertirenMinusculas(control: FormControl) {
    if (control.value.length < 120) {
      control.setValue(control.value.toLowerCase());
    }
    control.setValue(control.value.toLowerCase().substring(0, 120));
  }

  formatoCelularContacto(control: FormControl) {
    let telefono = control.value;
    telefono = telefono.replace(/[^\d]/g, '');

    if (telefono.length === 10) {
      telefono = `(${telefono.slice(0, 3)})${telefono.slice(
        3,
        6
      )}-${telefono.slice(6)}`;
    } else if (telefono.length > 10 && telefono.length <= 14) {
      // Ajustar el formato según la longitud deseada
      telefono = `(${telefono.slice(0, 3)})${telefono.slice(
        3,
        6
      )}-${telefono.slice(6, 10)}`;
    }

    // Actualizar el valor del control
    control.setValue(telefono);
  }
}
