import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuarioSource = new BehaviorSubject<any>(null);
  usuarioActual$ = this.usuarioSource.asObservable();

  constructor() { }

  actualizarDatosUsuario(datosUsuario: any) {
    // Simula una actualización de datos, por ejemplo, mediante una llamada HTTP
    // Después de una actualización exitosa, emite los nuevos datos del usuario
    this.usuarioSource.next(datosUsuario);

    // Aquí iría la lógica para actualizar los datos en el backend
  }
}
