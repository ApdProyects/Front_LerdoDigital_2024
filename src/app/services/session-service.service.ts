import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private nombreUsuarioSource = new BehaviorSubject<string | null>(null);
  //dominio = 'https://localhost:44334/';
  dominio = 'https://apir.grupoapd.mx/';


  constructor(private http: HttpClient) { }

  cargarNombreUsuario(correo: string) {
    this.getDatosUsuario(correo).subscribe(datos => {
      this.nombreUsuarioSource.next(datos.Usuario); // Suponiendo que 'Usuario' es la propiedad con el nombre
    });
  }

  get nombreUsuario$() {
    return this.nombreUsuarioSource.asObservable();
  }

  getDatosUsuario(
    correo: string,
  ): Observable<any> {
    const url = `${this.dominio}api/Ciudadanos/obtenerUsuario?correo=${correo}`;
    return this.http.get(url);
    
  }
}
