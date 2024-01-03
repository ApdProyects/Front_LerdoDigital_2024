import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  LoadingController,
  NavController,
} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-orden-pago',
  templateUrl: './orden-pago.page.html',
  styleUrls: ['./orden-pago.page.scss'],
})
export class OrdenPagoPage implements OnInit {
  nombre: string;
  tipo: string;
  iin_clave: string;
  respuesta: any;
  Qr_nombre: any;
  Qr_mensaje_valido: any;
  Qr_concepto: any;
  Qr_folio: any;
  Qr_fecha_cobro: any;
  Qr_estatus: any;
  Qr_imagen: any;
  correcto: boolean = false;
  error: boolean = false;
  is_recibo: boolean;
  is_orden: boolean;
  archivo: any;
  pdf: any;
  recibo: any;
  corralon: boolean = false;
  apps: boolean;
  pendiente: boolean;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public navCtrl: NavController,
    public domsanitizer: DomSanitizer,
    private _route: ActivatedRoute,
    private authService: AuthService
  ) {}

  async ngOnInit() {


    this.iin_clave = this._route.snapshot.paramMap.get('IIN_CLAVE');
    console.log(this.iin_clave)
    await this.check_datos_qr(this.iin_clave);
  }

  

  async login() {
    await this.navCtrl.navigateRoot('/servicios');
  }

  async check_datos_qr(iin_clave) {
    const loading = await this.loadingController.create({
      cssClass: 'my-loading-class',
      message: 'Cargando...',
    });
    await loading.present();
    debugger;
    this.respuesta = await this.authService.consulta_qr(iin_clave);
    await this.respuesta.forEach(async (element) => {
      if (element.codigo == 200 && element.QR_FOLIO != '') {
        this.Qr_nombre = element.QR_NOMBRE;
        this.Qr_mensaje_valido = element.QR_MENSAJE_VALIDO;
        this.Qr_concepto = element.QR_CONCEPTO;
        this.Qr_folio = element.QR_FOLIO;
        this.Qr_fecha_cobro = element.QR_FECHA_COBRO;
        this.Qr_estatus = element.QR_ESTATUS;
        this.Qr_imagen = element.QR_IMAGEN;
        this.recibo = element.QR_RECIBO;
        debugger;
        if (this.Qr_estatus == 'NO DISPONIBLE') {
          this.pendiente = true;
          this.correcto = false;
          this.error = false;
          this.corralon = false;
          return;
        } else {
          this.pendiente = false;
        }
        switch (parseInt(element.VQR_TIPO)) {
          case 10:
            this.is_recibo = false;
            this.is_orden = true;
            this.archivo = 'presupuestos/' + this.Qr_folio;
            // this.apps = true;
            break;

          case 6:
            this.is_recibo = false;
            this.is_orden = true;
            this.archivo = 'ordenes/' + this.Qr_folio;
            break;
          case 8:
            this.is_recibo = false;
            this.is_orden = false;
            this.corralon = true;
            break;
          default:
            this.is_recibo = true;
            this.is_orden = false;
            this.archivo = 'recibos/' + this.recibo;

            break;
        }
        debugger;
        switch (true) {
          case /ESTADO DE CUENTA/i.test(this.Qr_concepto):
            debugger;
            this.apps = true;
            break;
          case /INFRACCION/i.test(this.Qr_concepto):
            debugger;
            this.apps = true;
            break;
          case /MULTA/i.test(this.Qr_concepto):
            debugger;
            this.apps = true;
            break;
          case /PARQUIMETROS/i.test(this.Qr_concepto):
            debugger;
            this.apps = true;
            break;
          case /CORTE DE CAJA/i.test(this.Qr_concepto):
            debugger;
            this.apps = true;
            break;
          case /USO DE SUELO\/PLAZAS Y MERCADOS/i.test(this.Qr_concepto):
            debugger;
            this.apps = true;
            break;
          case /PLAZA/i.test(this.Qr_concepto):
            debugger;
            this.apps = true;
            break;
          default:
            debugger;
            this.apps = false;
            break;
        }
        if (this.Qr_imagen == '' || this.Qr_imagen == undefined) {
          this.Qr_imagen =
            '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';
        }
        debugger;
        if (this.corralon == true) {
          this.correcto = false;
          this.error = false;
        } else {
          this.correcto = true;
          this.error = false;
        }
      } else {
        this.error = true;
        this.correcto = false;
        this.corralon = false;
      }
      loading.dismiss();
    });

    loading.dismiss();
  }
}
