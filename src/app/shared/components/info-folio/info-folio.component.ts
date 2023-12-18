import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import * as moment from 'moment';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-info-folio',
  templateUrl: './info-folio.component.html',
  styleUrls: ['./info-folio.component.scss'],
})
export class InfoFolioComponent  implements OnInit {
  Noticias: any;
  respuesta: any;
  data: any;
  folio: any;
  foliosubs: any;
  element: any;
  detalle = null;
  searchv = false;
  isOpen = false;
  isOpenCatastro = false;
  isOpenfolio = true;
  isOpenPago = false;
  isVisa = false;
  isMaster = false;
  isOpenConfirmacion = false;
  infoCatastro = {
    contribuyente: '',
    IEPredial: '',
    REPredial: '',
    A1: '',
    A2: '',
    A3: '',
    A4: '',
    A5: '',
    GEPredial: '',
    Multas: '',
    REAnterior: '',
    Diferecias: '',
    Subtotal: '',
    Descuentos: '',
    Total: '',
  };
  info = {
    nombre: '',
    direccion: '',
    municipio: '',
    colonia: '',
    subtotal: '',
    importe: '',
    garantia: '',
    descuento: '',
    fecha: '',
    estado: '',
    estatus: '',
  };
  type_code: any;
  codigoVerificacion: any;
  type = {
    direccion: 'Prol. Allende #3 Col. Centro',
    telefono: '(871) 725 - 1061',
    titulo: 'Vialidad',
  };
  tipos = {
    2: {
      direccion: 'Prol. Allende #3 Col. Centro',
      telefono: '(871) 725 - 1061',
      titulo: 'Vialidad',
    },
    3: {
      direccion: 'direccion lerdo durango',
      telefono: '8714393131',
      titulo: ' parquímetro',
    },
    4: {
      direccion: 'direccion lerdo durango',
      telefono: '8714393131',
      titulo: ' Plazas y mercados',
    },
    6: {
      direccion: 'direccion lerdo durango',
      telefono: '8714393131',
      titulo: ' prevención social',
    },
    66: {
      direccion: 'direccion lerdo durango',
      telefono: '8714393131',
      titulo: ' Fomento económico',
    },
    24: {
      direccion: 'direccion lerdo durango',
      telefono: '8714393131',
      titulo: ' Desarrollo urbano',
    },
    19: {
      direccion: 'direccion lerdo durango',
      telefono: '8714393131',
      titulo: ' Protección civil',
    },
    30: {
      direccion: 'direccion lerdo durango',
      telefono: '8714393131',
      titulo: ' Medio ambiente',
    },
  };
  numerotarjeta: any;
  reference: any;
  url: any;
  PostContent: any;
  sanitizedURL: any;
  domSanitizer: any;

  importepredial: any;
  descuentospredial: any;
  totalpredial: any;

  textDescuento: any = '';

  constructor(private utilsSvc: UtilsService,
    private alertController: AlertController,
    private authService: AuthService,
    private NavCtrl: NavController,
    public loadingController: LoadingController,
    public domsanitizer: DomSanitizer) {

   }

  ngOnInit() {}
  async AlertP() {
    const alert = await this.alertController.create({
      cssClass: 'not_found_alert',
      header: 'LERDO DIGITAL',
      message: 'No se encontró el folio.',
      buttons: [
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Confirm Okay');
          },
        },
      ],
    });
    await alert.present();
  }

  async getInfoFolio() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Buscando...',
    });

    await loading.present();
    if (this.folio.length < 14) {
      await this.getfoliocatastro();
      await loading.dismiss();
      return;
    }

    this.foliosubs = this.folio;
    this.type_code = this.folio.substr(0, 2);
    this.element = this.folio.substr(2, 4);
    this.type = this.folio.substr(0, 2);

    this.data = [];
    this.respuesta = await this.authService.getInfoFolio(
      this.foliosubs,
      this.type_code,
      this.element
    );
    await this.respuesta.forEach(async (array) => {
      this.data = await array;
    });
    if (this.data.length > 0) {
      this.info.nombre = this.data[0][6];
      this.info.direccion = this.data[0][7];
      this.info.colonia = this.data[0][8];
      this.info.garantia = this.data[0][13];
      this.info.subtotal = Number(this.data[0][3]).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      this.info.importe = Number(this.data[0][5]).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      this.info.descuento = Number(
        this.data[0][3] - this.data[0][5]
      ).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      this.info.fecha = moment(this.data[0][1]).format('DD/MM/yyyy');
      this.info.estado = this.data[0][10];
      this.info.garantia = this.data[0][13];
      this.info.estatus = this.data[0][14];
      this.searchv = true;
      this.isOpen = true;
      this.isOpenfolio = false;
      this.isOpenPago = false;

      if (this.type_code == 2 && this.element == 2) {
        this.detalle = this.data;
      } else {
        this.detalle = null;
      }
    } else {
      this.searchv = false;
      this.AlertP();
    }
    this.reference = this.folio;

    var URL =
      'https://webhooks.lerdodigital.mx/form.php?TOTAL=' +
      this.info.importe.replace('$', '') +
      '&DEPTO=' +
      this.type_code +
      '&CONC=' +
      this.element +
      '&FOLIO=' +
      this.foliosubs +
      '&REFERENCE=' +
      this.reference +
      '&USUARIOAPD=' +
      localStorage.getItem('LUS_CLAVE') +
      '&CORREOAPD=' +
      localStorage.getItem('LUS_CORREO');

    this.url = this.domsanitizer.bypassSecurityTrustResourceUrl(URL);
    console.log(this.url);

    loading.dismiss();
  }
  async pagar() {
    this.searchv = false;
    this.isOpen = false;
    this.isOpenfolio = false;
    this.isOpenCatastro = false;
    this.isOpenPago = true;
  }
  async confirmarpago() {
    this.searchv = false;
    this.isOpen = false;
    this.isOpenfolio = true;
    this.isOpenPago = false;
    this.folio = '';
    this.foliosubs = '';
  }

  async search() {
    this.searchv = true;
    this.getInfoFolio();
  }

  // CATASTRO --------------------------------------------------------------------------------
  async getfoliocatastro() {
    let data: any;
    this.ValidarCodigo();
    return;
  }

  async ValidarCodigo() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Buscando...',
    });
    await loading.present();

    let data: any;
    let datos: any;

    this.codigoVerificacion = 5555;
    this.importepredial = 0;

    this.respuesta = await this.authService.getValidaCodigo(
      this.folio,
      this.codigoVerificacion
    );
    await this.respuesta.forEach(async (array) => {
      data = await array;
    });

    if (data.codigo < 0) {
      const alert = await this.alertController.create({
        cssClass: 'not_found_alert',
        header: 'LERDO DIGITAL',
        message: data.mensaje,
        buttons: [
          {
            text: 'Aceptar',
            handler: () => {
              console.log('Confirm Okay');
            },
          },
        ],
      });
      await alert.present();

      this.searchv = false;
      this.isOpen = false;
      this.isOpenfolio = true;
      this.isOpenPago = false;
      this.isOpenConfirmacion = false;
      this.isOpenCatastro = false;

      await loading.dismiss();
    } else {
      this.isOpenCatastro = true;
      this.isOpenfolio = false;
      this.isOpenConfirmacion = false;
      this.isOpenfolio = false;
      this.isOpenCatastro = true;
      this.isOpenPago = false;

      data.Cs_InfoFolio.forEach((element) => {
        datos = element.ItemArray;
      });

      var today = new Date();
      var mm = today.getMonth() + 1;

      debugger;
      if (mm == 1) {
        this.textDescuento = 'DESCUENTO DEL 15% DEL MES ENERO';
      } else if (mm == 2) {
        this.textDescuento = 'DESCUENTO DEL 10% DEL MES FEBRERO';
      } else if (mm == 3) {
        this.textDescuento = 'DESCUENTO DEL 5% DEL MES MARZO';
      } else {
        this.textDescuento = 'DESCUENTO';
      }

      this.infoCatastro.contribuyente = datos[7];
      this.infoCatastro.IEPredial = datos[34].toFixed(2);
      this.infoCatastro.REPredial = datos[35].toFixed(2);
      this.infoCatastro.A1 = datos[36].toFixed(2);
      this.infoCatastro.A2 = datos[37].toFixed(2);
      this.infoCatastro.A3 = datos[38].toFixed(2);
      this.infoCatastro.A4 = datos[39].toFixed(2);
      this.infoCatastro.A5 = datos[40].toFixed(2);
      this.infoCatastro.GEPredial = datos[41].toFixed(2);
      this.infoCatastro.Multas = datos[42].toFixed(2);
      this.infoCatastro.REAnterior = datos[43].toFixed(2);
      this.infoCatastro.Diferecias = datos[44].toFixed(2);

      debugger;
      let Descuento = Number(datos[60].toFixed(2));
      let total = Number(datos[45].toFixed(2)) - Descuento;
      this.infoCatastro.Total = Number(total.toFixed(2)).toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD',
        }
      );
      this.importepredial = datos[45].toFixed(2);
      this.infoCatastro.Descuentos = Number(
        Descuento.toFixed(2)
      ).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      });
      this.descuentospredial = 0; // datos[54].toFixed(2);
      this.totalpredial =
        parseFloat(this.importepredial) + parseFloat(this.descuentospredial);
      this.infoCatastro.Subtotal = Number(this.totalpredial).toLocaleString(
        'en-US',
        {
          style: 'currency',
          currency: 'USD',
        }
      );

      var URL =
        'https://webhooks.lerdodigital.mx/form.php?TOTAL=' +
        this.infoCatastro.Total.replace('$', '') +
        '&DEPTO=' +
        '11' +
        '&CONC=' +
        '0' +
        '&FOLIO=' +
        this.folio +
        '&REFERENCE=' +
        this.folio +
        '&USUARIOAPD=' +
        localStorage.getItem('LUS_CLAVE') +
        '&CORREOAPD=' +
        localStorage.getItem('LUS_CORREO');

      this.url = this.domsanitizer.bypassSecurityTrustResourceUrl(URL);

      await loading.dismiss();
    }
  }

  async pagarCatastro() {
    this.searchv = false;
    this.isOpen = false;
    this.isOpenfolio = false;
    this.isOpenPago = true;
  }

}

