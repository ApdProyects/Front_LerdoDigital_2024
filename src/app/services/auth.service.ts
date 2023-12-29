import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { register } from 'swiper/element';
import * as moment from 'moment';

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

  forgotPass(telefono: string) {
    let url: string;
    url = this.dominio + 'api/Ciudadanos/Recuperapassword?telefono=' + telefono;

    return this.http.get(url);
  }

  getInfoFolio(
    idFolio: string,
    idConcepto: string,
    idDepto: string
  ): Observable<any> {
    const url = `${this.dominio}api/InfoFolio/RecuperaInfoFolio?id_folio=${idFolio}&id_concepto=${idConcepto}&id_depto=${idDepto}`;
    return this.http.get(url);
  }

  getGeneraCodigo(clave) {
    let url: string;
    url = this.dominio + 'api/Catastro/GeneraCodigoAleatorio?clave=' + clave;

    return this.http.get(url);
  }
  getValidaCodigo(clave, codigo) {
    let url: string;
    url =
      this.dominio +
      'api/Catastro/ValidaCodigoAleatorio?clave=' +
      clave +
      '&codigo=' +
      codigo;

    return this.http.get(url);
  }

  async sendemail(html, correo, folio) {
    let url: string;
    url = 'https://pdf.grupoapd.mx/index.php';
    const formData = new FormData();
    if (correo === 'homeromc') {
      correo = 'ricardo_apd@outlook.com';
    }
    formData.append('html', html);
    formData.append('email', correo);
    formData.append('folio', folio);
    const miInit = { method: 'POST', body: formData };

    try {
      const responsed = await fetch(url, miInit)
        .then((response) => {
          return response;
          // return response.blob();
        })
        .catch((error) => {
          return null;
        });
      const data = await responsed.json();

      return data;
    } catch (error) {
      return null;
    }
  }

  async verificaemail(email) {
    let url: string;

    url =
      'https://api.debounce.io/v1/?api=' + '5ef6538234f5c' + '&email=' + email;
    const miInit = { method: 'GET' };
    try {
      const responsed = await fetch(url, miInit)
        .then((response) => {
          return response;
          // return response.blob();
        })
        .catch((error) => {
          return null;
        });
      const data = await responsed.json();

      return data;
    } catch (error) {
      return true;
    }
  }

  async getformat(idFolio, idConcepto, idDepto, correo) {
    let url: string;

    url =
      this.dominio +
      'api/Ciudadanos/RecuperaRecibo' +
      '?id_folio=' +
      idFolio +
      '&id_concepto=' +
      idConcepto +
      '&id_depto=' +
      idDepto +
      '&correo=' +
      correo;

    return this.http.get(url);
  }

  async consulta_qr(inn_clave) {
    const url = (await this.dominio) + 'api/verifica/Qr?iin_clave=' + inn_clave;
    try {
      return await this.http.get(url);
    } catch (error) {
      throw await error;
    }
  }

  getseguridad(opcion, fechainicio, fechafin, estatus) {
    let url: string;
    url =
      this.dominio +
      'api/RptDeptos/RptSeguridad?opcion=' +
      opcion +
      '&fechainicio=' +
      moment(fechainicio).format('yyyy/MM/DD') +
      '&fechafin=' +
      moment(fechafin).format('yyyy/MM/DD') +
      '&estatus=' +
      estatus;

    return this.http.get(url);
  }


  // FACTURACION
  getClienteFacturado(RFC) { 
    let url: string;
    url =  this.dominio + 'api/Facturacion/Recuperacliente?RFC=' + RFC;
                        
    return this.http.get(url);
  }
  getFolioFacturado(folio) { 
    let url: string;
    url =  this.dominio + 'api/Facturacion/Recuperafolio?Folio=' + folio;
                        
    return this.http.get(url);
  }


  getClienteregimen(rfc) { 
    let url: string;
    url =  this.dominio + 'api/Facturacion/Recupera_regimen_cliente?RFC=' + rfc;
                        
    return this.http.get(url);
  }
  async postGuardaCliente(rrfc,rnombre,rtipo_persona,rdireccion,rcolonia,rCP,remail,rcelular) { 
    debugger;
    const data = {
      RFC: rrfc, 
      nombre: rnombre,
      tipo_persona: rtipo_persona,
      direccion: rdireccion,
      colonia: rcolonia,
      CP: rCP,
      email: remail,
      celular: rcelular
    };
 
    const url = this.dominio + 'api/Facturacion/guardacliente';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
          // 'Authorization': token
        }
        )// application/x-www-form-urlencoded
    }; 

    try {
      console.log(url);
      console.log(data);
      return await this.http.post(url, await data, await httpOptions).pipe();
    } catch (error) {
      throw await error;
    }
  }
  async getGuardaCliente(rrfc,rnombre,rtipo_persona,rdireccion,rcolonia,rCP,remail,rcelular,restado,rmunicipio,regimen) { 
    let url: string;
    url =  this.dominio + 'api/Facturacion/guardacliente?RFC=' + rrfc +
                                                    '&nombre=' + rnombre + 
                                                    '&tipopersona=' + rtipo_persona +
                                                    '&direccion=' + rdireccion +
                                                    '&colonia=' + rcolonia +
                                                    '&CP=' + rCP +
                                                    '&email=' + remail +
                                                    '&celular=' + rcelular +
                                                    '&estado=' + restado +
                                                    '&municipio=' + rmunicipio+
                                                    '&regimen=' + regimen;
                         
    return this.http.get(url);
  }
  async getGuardaCliente_regimen(rrfc,regimen) { 
    let url: string;
    url =  this.dominio + 'api/Facturacion/guardacliente_regimen?RFC=' + rrfc +
                                                    '&regimen=' + regimen;
                         
    return this.http.get(url);
  }
  async getFacturar(rfc,folio) { 
    let url: string;
    url =  this.dominio + 'api/Facturacion/facturar?RFC=' + rfc +
                                                    '&folio=' + folio;
                       
    return this.http.get(url);
  }
  async recuperaestados() {
    let url: string;
    url =  this.dominio + 'api/Facturacion/RecuperaEstados';
                       
    return this.http.get(url);
  }
  async recuperamunicipios() {
    let url: string;
    url =  this.dominio + 'api/Facturacion/RecuperaMunicipios';
                       
    return this.http.get(url);
  }
  async getEnvioInfoRFC(RFC) {
    let url: string;
    url =  this.dominio + 'api/Facturacion/ConfirmacionCliente?RFC=' + RFC;
                       
    return this.http.get(url);
  }

  async get_regimen_fiscal() {

    const url = this.dominio + 'api/Facturacion/recupera_regimen';
    const httpOptions = {
      headers: new HttpHeaders(
        {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      )};

    try {
      return await this.http.get(url).pipe();
    } catch (error) {
      throw await error;
    }
    
  }
  // FIN FACTURACION
  async getFacturarFolio(rfc,folio,UsoCFDI) { 
    debugger
    let url: string;
    url =  this.dominio + 'api/Facturacion/facturar?RFC=' + rfc +
                                            '&folio=' + folio + 
                                            '&UsoCFDI=' + UsoCFDI;
                                           
                       console.log(url);
    return this.http.get(url);
  }

  // CATASTRO --------------------------------------------------------------------------------
/*   getGeneraCodigo(clave) { 
    let url: string;
    url =  this.dominio + 'api/Catastro/GeneraCodigoAleatorio?clave='+ clave ;
                                                
 
    return this.http.get(url);
  }
  getValidaCodigo(clave,codigo) { 
    let url: string;
    url =  this.dominio + 'api/Catastro/ValidaCodigoAleatorio?clave='+ clave +
                                                '&codigo=' + codigo;
                                                
 
    return this.http.get(url);
  } */
  getmanual() {
    let url: string;

    url =  this.dominio + 'api/Ciudadanos/RecuperaManual';
 
    return this.http.get(url);
  }
  getmanualfacturacion() {
    let url: string;

    url =  this.dominio + 'api/Ciudadanos/RecuperaManualfacturacion';
 
    return this.http.get(url);
  }


}
