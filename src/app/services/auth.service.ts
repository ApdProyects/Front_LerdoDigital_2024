import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { register } from 'swiper/element';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  dominio = 'https://localhost:44334/';

  constructor(private http: HttpClient) {}

  login(usuario: string, password: string) {
    /* debugger; */
    const url =
      this.dominio +
      'api/Ciudadanos/LoginUsuario' +
      '?usuario=' +
      usuario +
      '&password=' +
      password;

    /*     console.log('URL de la solicitud:', url);
     */
    const httpOptions = {
      headers: new HttpHeaders({}),
    };

    return this.http.get(url, httpOptions);
  }

  registerUser(
    contrasena: string,
    correo: string,
    usuario: string,
    telefono: string
  ) {
    const url = this.dominio + 'api/Ciudadanos/insertaUsuario';

    // Utilizando HttpParams para construir la URL de forma segura
    const params = new HttpParams()
      .set('contrasena', contrasena)
      .set('correo', correo)
      .set('usuario', usuario)
      .set('telefono', telefono);

    // Utilizando el método get para enviar los parámetros
    return this.http.get(url, { params });
  }

  forgotPass(telefono:string) {
    let url: string; 
    url =  this.dominio + 'api/Ciudadanos/Recuperapassword?telefono=' + telefono;
 
    return this.http.get(url);
  }

  getInfoFolio(idFolio: string, idConcepto: string, idDepto: string): Observable<any> {
    const url = `${this.dominio}api/InfoFolio/RecuperaInfoFolio?id_folio=${idFolio}&id_concepto=${idConcepto}&id_depto=${idDepto}`;
    return this.http.get(url);
  }

  getGeneraCodigo(clave) { 
    let url: string;
    url =  this.dominio + 'api/Catastro/GeneraCodigoAleatorio?clave='+ clave ;
                                                
 
    return this.http.get(url);
  }
  getValidaCodigo(clave, codigo) { 
    let url: string;
    url =  this.dominio + 'api/Catastro/ValidaCodigoAleatorio?clave='+ clave +
                                                '&codigo=' + codigo;
                                                
 
    return this.http.get(url);
  

  }

  async sendemail( html, correo, folio) {
    let url: string;
    url =  'https://pdf.grupoapd.mx/index.php';
    const formData = new FormData();
    if ( correo === 'homeromc' ) {
        correo = 'ricardo_apd@outlook.com';
    }
    formData.append('html', html);
    formData.append('email', correo);
    formData.append('folio', folio);
    const miInit = { method: 'POST', body: formData};

    try {
        const responsed = await fetch(url , miInit)
            .then(response => {
                return   response;
                // return response.blob();
            })
            .catch(error => {
                return null;
            });
        const data = await responsed.json();

        return data;
    } catch ( error) {
        return null;
    }
} 

async verificaemail(email) { 
  let url: string;

  url =  'https://api.debounce.io/v1/?api=' + '5ef6538234f5c' + '&email=' + email ;
  const miInit = { method: 'GET'}; 
  try {
      const responsed = await fetch(url , miInit)
          .then(response => {
              return   response;
              // return response.blob();
          })
          .catch(error => {
              return null;
          });
      const data = await responsed.json();

      return data;
  } catch ( error) {
      return true;
  } 
} 

}
