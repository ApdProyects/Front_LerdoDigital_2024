import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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
    telefono: new FormControl('',[Validators.required,
      Validators.minLength(10), Validators.maxLength(14)
    ]),
    contrasena: new FormControl('', [Validators.required]),
    confirmarContrasena: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit() {
  }

  
  ConvertirenMinusculas(control : FormControl){

    if (control.value.length < 120) {
      control.setValue(control.value.toLowerCase());
    }
    control.setValue(control.value.toLowerCase().substring(0, 120));
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

}
