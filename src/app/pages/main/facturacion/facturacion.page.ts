import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  IonicSafeString,
  LoadingController,
  NavController,
  Platform,
  ToastController,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { ActivatedRoute, Router } from '@angular/router';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          opacity: 1,
          backgroundColor: '#efee6ba6',
        })
      ),
      state(
        'closed',
        style({
          height: '0px',
          opacity: 0,
          backgroundColor: 'green',
        })
      ),
      transition('open => closed', [animate('.2s')]),
      transition('closed => open', [animate('.2s')]),
    ]),
  ],
})
export class FacturacionPage implements OnInit {
  respuesta: any;
  resp_confirmacion: any;
  folio: any = '';
  folioacortado: any = '';
  folioDescription: any = [];
  rfc: any = '';
  isOpen = false;
  isOpenfolio = true;
  isOpencaptura = false;
  accesoDirecto: boolean = false;
  isOpenInfoRFC = false;
  info = {
    subtotal: 300,
    iva: 48,
    total: 348,
  };

  nombre: any = '';
  tipo_persona: any = '';
  direccion: any = '';
  colonia: any = '';
  CP: any = '';
  email: any = '';
  celular: any = '';
  UsoCFDI: any = 'GASTOS EN GENERAL';
  res: any;
  estado: any;
  municipio: any;
  regimen: any = '';
  respestado = [];
  respmunicipios = [];
  modmunicipios = [];
  Regimen_fiscal = [];
  isRegimen: boolean;

  constructor(
    private utilsSvc: UtilsService,
    private authService: AuthService,
    private AlertController: AlertController,
    public LoadingController: LoadingController,
    private _route: ActivatedRoute,
    private http: HttpClient,
    public NavCtrl: NavController,
    private platform: Platform,
    public toastController: ToastController
  ) {}

  async ngOnInit() {
   /*  this.respuesta = await this.authService.get_regimen_fiscal();
    await this.respuesta.forEach((element) => {
      console.table(element);
      this.folioDescription = element.map((element: { 2: any }) => element[2]);
    });
    console.log(this.folioDescription); */

    //this.isOpencaptura = true;
    this._route.params.subscribe((params) => {
      this.folio = params['FOLIO'];
      if (this.folio != '') {
        this.folio = this._route.snapshot.paramMap.get('IIN_CLAVE');
      } else {
        this.folio = '';
      }
    });
     debugger; 
    this.respuesta = await this.authService.recuperaestados();

    await this.respuesta.forEach((element) => {
      this.respestado = element;
    });

    this.respuesta = await this.authService.recuperamunicipios();

    await this.respuesta.forEach((element) => {
      this.respmunicipios = element;
    });

    this.respuesta = await this.authService.get_regimen_fiscal();
    await this.respuesta.forEach((element) => {
       debugger; 
      this.Regimen_fiscal = element;
      console.log(this.Regimen_fiscal);
    });


  
  }
  async searchfolio() {
    /* debugger; */
    var cliente: any;
    var folio_resp: any;
    this.res = [];
    var regimen_cliente: any;

    const loading = await this.LoadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    
    if (this.folio === '') {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Favor de llenar el campo Folio',
        icon: 'warning', // Puedes cambiar el ícono según necesites
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', // Aquí puedes aplicar tus clases CSS personalizadas
        },
      });
      document.body.classList.remove('swal2-height-auto');

      loading.dismiss();
      return;
    }

    if (this.folio === '') {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Favor de llenar el campo Folio',
        icon: 'warning', // Puedes cambiar el ícono según necesites
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', // Aquí puedes aplicar tus clases CSS personalizadas
        },
      });
      document.body.classList.remove('swal2-height-auto');
      loading.dismiss();
      return;
    }

    /* if (this.folio.length !== 16 || this.folio.length)
    { 
      const alert = this.AlertController.create({
        header: 'LERDO DIGITAL',
        cssClass: 'alertDanger',
        message: 'El folio debe ser  de 11 ó 16 digitos, favor de rectificar.',
        buttons: ['Aceptar']
      });
      (await alert).present();
      loading.dismiss();
      return;
    }*/

    if (this.rfc.length < 12 || this.rfc.length > 13) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'El RFC no debe ser menor a 12 dígitos ni mayor a 13, favor de rectificar.',
        icon: 'error', // Puedes cambiar el ícono según necesites
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', // Aquí puedes aplicar tus clases CSS personalizadas
        },
      });
      document.body.classList.remove('swal2-height-auto');
      loading.dismiss();
      return;
    }

    this.respuesta = await this.authService.getClienteFacturado(this.rfc);
    /* debugger; */
    await this.respuesta.forEach((element) => {
      cliente = element;
    });
    this.respuesta = await this.authService.getFolioFacturado(this.folio);

    await this.respuesta.forEach((element) => {
      folio_resp = element;
    });
    this.respuesta = await this.authService.getClienteregimen(this.rfc);
    /* debugger; */
    await this.respuesta.forEach((element) => {
      regimen_cliente = element;
    });
    if (folio_resp.codigo <= 0) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'El folio ingresado no existe',
        icon: 'error', // Puedes cambiar el ícono según necesites
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', // Aquí puedes aplicar tus clases CSS personalizadas
        },
      });
      document.body.classList.remove('swal2-height-auto');
      loading.dismiss();
      return;
    }

    if (cliente.codigo <= 0) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'El RFC ingresado no tiene un registro, debe darse de alta para poder facturar',
        icon: 'warning', 
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', 
        },
      }).then(() => {
        // Lógica adicional después de cerrar la alerta
        this.isOpenfolio = false;
        this.isOpencaptura = true;
        this.isOpenInfoRFC = false;
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (regimen_cliente.codigo <= 0) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'El RFC ingresado no tiene un Régimen Fiscal Asignado, debe registrarlo para poder facturar',
        icon: 'warning', // Puedes cambiar el ícono según necesites
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', // Aquí puedes aplicar tus clases CSS personalizadas
        },
      }).then(() => {
        // Lógica adicional después de cerrar la alerta
        this.isOpenfolio = false;
        this.isOpencaptura = false;
        this.isOpenInfoRFC = false;
        this.isRegimen = true;
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    /*  debugger; */
    // this.respuesta = await this.DataService.getFacturar(this.rfc,this.folio);
    this.respuesta = await this.authService.getFacturarFolio(
      this.rfc,
      this.folio,
      this.UsoCFDI
    );
    console.table(this.respuesta)

    await this.respuesta.forEach(async (element) => {
      console.log(element.objetoError);
      this.res = await element;
    });

    if (this.res.codigo < 0) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: this.res.mensaje,
        icon: 'error', // Puedes cambiar el ícono según necesites
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', // Aquí puedes aplicar tus clases CSS personalizadas
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
    }

    if (this.res.codigo === 1) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Folio Facturado correctamente, el PDF de la factura se envió al correo previamente registrado.',
        icon: 'success', // Puedes cambiar el ícono según necesites
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger', // Aquí puedes aplicar tus clases CSS personalizadas
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
    }

    loading.dismiss();
  }
  async accesoDirectoAlFormulario() {
    this.isOpenfolio = false;
    this.isOpencaptura = true;
    this.isOpenInfoRFC = false;
  }

  async guardarcliente() {
    /* debugger; */
    var respuesta: any;
    const loading = await this.LoadingController.create({
      message: 'Cargando...',
    });
    await loading.present();

    if (this.rfc === '') {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Favor de llenar el campo rfc',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (this.nombre === '') {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Favor de llenar el campo nombre',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (this.email === '') {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Favor de llenar el campo correo',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (this.celular === '') {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Favor de llenar el campo telefono',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (
      this.regimen === '' ||
      this.regimen === '0' ||
      this.regimen === undefined
    ) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Aun no selecciona su Regimen Fiscal, Favor de rectificar',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (this.CP === '' || this.CP === ' ' || this.CP === undefined) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Aun no ingresa su Código Postal, Favor de rectificar',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (
      this.colonia === '' ||
      this.colonia === ' ' ||
      this.colonia === undefined
    ) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Aun no ingresa la Colonia, Favor de rectificar',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    if (
      this.direccion === '' ||
      this.direccion === ' ' ||
      this.direccion === undefined
    ) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Aun no ingresa su Dirección, Favor de rectificar',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }

    this.respuesta = await this.authService.getGuardaCliente(
      this.rfc,
      this.nombre,
      this.tipo_persona,
      this.direccion,
      this.colonia,
      this.CP,
      this.email,
      this.celular,
      this.estado,
      this.municipio,
      this.regimen
    );

    await this.respuesta.forEach((element) => {
      respuesta = element;
    });

    if (respuesta.codigo > 0) {
      // Reseteo de variables
      this.nombre = '';
      this.tipo_persona = '';
      // ... (resto de las variables)

      this.isOpen = false;
      this.isOpenfolio = true;
      this.isOpencaptura = false;
      this.isOpenInfoRFC = false;

      // Mostrar alerta de SweetAlert
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: respuesta.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    } else if (respuesta.codigo <= 0) {
      console.log(respuesta.objetoError);

      let mensajeError = 'Se produjo un error inesperado.';
      if (respuesta.codigoError == 500) {
        mensajeError = 'Error interno del servidor, inténtelo nuevamente.';
      } else if (respuesta.codigoError == 400) {
        mensajeError = respuesta.mensaje;
      }

      Swal.fire({
        title: 'LERDO DIGITAL',
        text: mensajeError,
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger',
        },
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }
  }


  async cancelar() {
    this.isOpen = false;
    this.isOpenfolio = true;
    this.isOpencaptura = false;
    this.isOpenInfoRFC = false;
    this.isRegimen = false;
    this.folio = '';
    this.rfc = '';

    this.nombre = '';
    this.tipo_persona = '';
    this.direccion = '';
    this.colonia = '';
    this.CP = '';
    this.email = '';
    this.celular = '';
    this.regimen = '';

  
  }
  async close() {
    this.isOpen = false;
    this.isOpenfolio = true;
    this.isOpencaptura = false;
    this.isOpenInfoRFC = false;
    this.folio = '';
    this.rfc = '';

    this.nombre = '';
    this.tipo_persona = '';
    this.direccion = '';
    this.colonia = '';
    this.CP = '';
    this.email = '';
    this.celular = '';
    this.regimen = '';
  }
  async salir() {
    await this.NavCtrl.navigateRoot('/index');
  }
  async cambioestado() {
    this.modmunicipios = [];
    this.respmunicipios.forEach((element) => {
      if (element[1] == this.estado) {
        this.modmunicipios.push(element);
      }
    });
  }
  async EnviarInfoRFC() {
    this.isOpen = false;
    this.isOpenfolio = false;
    this.isOpencaptura = false;
    this.isOpenInfoRFC = true;
  }
  async enviaInformacion() {
    const loading = await this.LoadingController.create({
      message: 'Enviando información...',
    });
    await loading.present();

    /*  debugger; */
    if (this.rfc === '') {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Favor de llenar el campo rfc',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger'
        }
      });
      document.body.classList.remove('swal2-height-auto');
      loading.dismiss();
      return;
    }
    
    if (this.rfc.length < 12 && this.rfc.length > 13) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'El RFC no debe ser menor a 12 dígitos ni mayor a 13, favor de rectificar.',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger'
        }
      });
      document.body.classList.remove('swal2-height-auto');
      loading.dismiss();
      return;
    }
    

    this.respuesta = await this.authService.getEnvioInfoRFC(this.rfc);

    await this.respuesta.forEach((element) => {
      this.resp_confirmacion = element;
    });

    if (this.resp_confirmacion.codigo > 0) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'La información se envio correctamente al correo.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger'
        }
      });
      document.body.classList.remove('swal2-height-auto');
      loading.dismiss();
    } else {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Hubo un error al enviar la información, inténtelo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger'
        }
      });
      document.body.classList.remove('swal2-height-auto');
      loading.dismiss();
    }
  }

  async ayuda() {
    const loading = await this.LoadingController.create({
      cssClass: 'my-custom-class',
      message: 'descargando manual...',
    });
    await loading.present();

    let resp: any;
    let data: any;

    data = await this.authService.getmanualfacturacion();

    await data.forEach((element) => {
      resp = element;
    });

    if (resp.codigo > 0) {
      var link = document.createElement('a');
      link.href = 'data:application/pdf;base64,' + resp.PDF;
      link.download = 'facturacion_LerdoDigital.pdf';
      link.click();
    
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'El manual se descargó correctamente.',
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'not_found_alert'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Confirm Okay');
        }
        document.body.classList.remove('swal2-height-auto');
      });
    } else {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'No se pudo descargar el manual, favor de intentarlo nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'not_found_alert'
        }
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Confirm Okay');
        }
      });
    }
    document.body.classList.remove('swal2-height-auto');
    loading.dismiss();
  }    

  async guardarcliente_regimen() {
    var respuesta: any;
    if (this.regimen === '' || this.regimen === '0' || this.regimen === undefined) {
      Swal.fire({
        title: 'LERDO DIGITAL',
        text: 'Debe seleccionar un Regimen Fiscal según su Constancia de situación Fiscal, Favor de rectificar',
        icon: 'warning',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger'
        }
      });
      //loading.dismiss();
      document.body.classList.remove('swal2-height-auto');
      return;
    }
    
    const loading = await this.LoadingController.create({
      message: 'Cargando...',
    });
    await loading.present();
    this.respuesta = await this.authService.getGuardaCliente_regimen(
      this.rfc,
      this.regimen
    );
    /* debugger; */
    await this.respuesta.forEach((element) => {
      respuesta = element;
    });

    if (respuesta.codigo > 0) {
      this.nombre = '';
      this.tipo_persona = '';
      this.direccion = '';
      this.colonia = '';
      this.CP = '';
      this.email = '';
      this.celular = '';
      this.regimen = '';
      /* debugger; */
      this.isOpen = await false;
      this.isOpenfolio = await true;
      this.isOpencaptura = await false;
      this.isOpenInfoRFC = false;
      this.isRegimen = await false;

      Swal.fire({
        title: 'LERDO DIGITAL',
        text: respuesta.mensaje,
        icon: 'success',
        confirmButtonText: 'Aceptar',
        customClass: {
          popup: 'alertDanger'
        }
      });
      document.body.classList.remove('swal2-height-auto');
      await loading.dismiss();
      return;
    }
  }
  async doRefresh(event: any) {
    if (this.platform.is('mobile')) {
      setTimeout(async () => {
        // Aquí es donde reiniciarás tu operación como si estuvieras empezando de nuevo.
        // Por ejemplo, limpiar las variables del formulario, restablecer los estados, etc.

        this.folio = '';
        this.rfc = '';

        event.target.complete();
        const toast = await this.toastController.create({
          message: 'Los datos han sido reiniciados.',
          duration: 1500,
          position: 'bottom',
          color: 'light',
        });
        toast.present();
      }, 1000);
    } else {
      event.target.complete();
    }
  }
}
