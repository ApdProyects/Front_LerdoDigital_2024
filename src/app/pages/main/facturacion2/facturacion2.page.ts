import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  FormsModule,
} from '@angular/forms';
import {
  AlertController,
  IonicSafeString,
  LoadingController,
  ModalController,
  NavController,
  Platform,
  ToastController,
  IonicModule,
} from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Factura } from 'src/app/models/Factura.model';

import { ActivatedRoute, Router } from '@angular/router';
import { TablaFacturaComponent } from 'src/app/shared/components/tabla-factura/tabla-factura.component';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
import { AltaRfcModalComponent } from 'src/app/shared/components/alta-rfc-modal/alta-rfc-modal.component';


@Component({
  selector: 'app-facturacion2',
  templateUrl: './facturacion2.page.html',
  styleUrls: ['./facturacion2.page.scss'],
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
export class Facturacion2Page implements OnInit {
  respuesta: any;
  resp_confirmacion: any;
  foliosFacturas: string[] = [''];
  folio: any = '';
  folioacortado: any = '';
  folioDescription: any = [];
  folioDescripcion: any = '';
  rfc: any = '';
  isOpen = false;
  isOpenfolio = true;
  isOpencaptura = false;
  accesoDirecto: boolean = false;
  isOpenInfoRFC = false;

  /*  info = {
    subtotal: 300,
    iva: 48,
    total: 348,
  }; */

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
  importe: any;
  facturaDePrueba: Factura;
  subscription: Subscription;
  usuario: any;
  mensaje: any = '';
  displayedData: any[] = [];
  private readonly IVA_PORCENTAJE = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;
  formasPago: any[] = [];
  formaPagoSeleccionada: any;
  metodoPagoSeleccionado: string = '';
  NOMBRE_FISCAL: any;
  CP_FISCAL: any;
  Direccion_FISCAL: any;
  MetodoPago: any;

  constructor(
    private utilsSvc: UtilsService,
    private authService: AuthService,
    private AlertController: AlertController,
    public modalController: ModalController,
    public LoadingController: LoadingController,
    private _route: ActivatedRoute,
    private http: HttpClient,
    public NavCtrl: NavController,
    private platform: Platform,
    public toastController: ToastController,
    private router: Router
  ) {}

  async ngOnInit() {
    this.subscription = this.utilsSvc.currentFolio.subscribe((folio) => {
      this.folio = folio;
    });

    this.cargarDatosUsuario();
    this.cargarFormasPago();
  }

  ngOnDestroy() {
    // No olvides desuscribirte para evitar fugas de memoria
    this.subscription.unsubscribe();
  }

  async showFolioF(FolioF: Factura) {
    await this.utilsSvc.presentModal({
      component: TablaFacturaComponent,
      componentProps: { FolioF },
      cssClass: 'modal-full-size',
    });
  }

  agregarFolio() {
    this.foliosFacturas.push('');
  }

  cargarDatosUsuario(): void {
    const rfc = localStorage.getItem('ULTIMO_RFC');
    if (rfc) {
      // Si existe un RFC en localStorage, actualiza el modelo vinculado al ion-input
      this.rfc = rfc;
      console.log('RFC obtenido desde localStorage:', rfc);
    } else {
      console.log('No se encontró el RFC del usuario en localStorage.');
    }
  }


  async recuperarDatos() {
    if (this.rfc) {
      this.authService.recuperarDatosFiscales(this.rfc).subscribe({
        next: (datos) => {
          // Verifica si los datos fiscales indican un RFC no existente
          if (datos.NOMBRE_FISCAL === 'NO INGRESADO' || datos.CP_FISCAL === '--' || datos.REGIMEN_FISCAL === '--' || datos.DIRECCION_FISCAL === '--') {
            console.log('RFC no encontrado, mostrando formulario de alta.');
            //this.isOpencaptura = true; 
         
              this.router.navigate(['main/facturacion']);
                
            
          } else {
            // Si los datos fiscales son válidos, actualiza las propiedades del componente
            this.nombre = datos.NOMBRE_FISCAL;
            this.CP = datos.CP_FISCAL;
            this.regimen = datos.REGIMEN_FISCAL;
            this.direccion = datos.DIRECCION_FISCAL;
            console.log('Datos fiscales recuperados:', datos);
  
            this.router.navigate(['/facturacion2']);
          }
        },
        error: (error) => {
          console.error('Error al recuperar los datos fiscales:', error);
          // Manejo de errores. Dependiendo del error, podrías querer abrir el formulario aquí también.
        },
      });
    } else {
      console.error('Error: RFC no proporcionado.');
    }
  }

  async abrirAltaRfcModal() {
    const modal = await this.modalController.create({
      component: AltaRfcModalComponent,
      // Puedes pasar datos al modal si es necesario
      componentProps: { rfc: this.rfc }
    });
    await modal.present();
  
    // Opcionalmente, maneja el retorno de datos del modal al cerrarse
    const { data } = await modal.onWillDismiss();
    if (data) {
      // Maneja los datos retornados
      console.log(data);
    }
  }
  

  async recuperarFolio() {
    if (this.folio) {
      this.authService.recuperaFolioGrid(this.folio).subscribe({
        next: (datos) => {
          // Verifica si el mensaje indica que el folio ya fue facturado
          if (datos.MENSAJE && datos.MENSAJE.includes('ya fue facturado')) {
            this.mostrarAlertaFolioPagado(datos.MENSAJE);
          } else {
            this.displayedData.push({
              Folio: this.folio,
              Descripcion_Folio: datos.Descripcion_Folio,
              Importe_Folio: datos.Importe_Folio,
            });
            console.log(datos);
            this.calcularTotales();
          }
          this.folio = ''; // Limpiar el campo de folio
        },
        error: (error) => {
          console.error('Error al recuperar los datos fiscales:', error);
          // Aquí podrías manejar errores de la petición, como problemas de conexión
        },
      });
    } else {
      console.error('Error: Folio no proporcionado.');
    }
  }
  
  async mostrarAlertaFolioPagado(mensaje: string) {
    const alert = await this.AlertController.create({
      header: 'Folio Facturado',
      message: mensaje,
      buttons: ['OK']
    });
  
    await alert.present();
  }
  


  eliminarFolio(index: number) {
    this.displayedData.splice(index, 1);
    this.calcularTotales();
  }

  calcularTotales() {
    this.subtotal = this.displayedData.reduce(
      (sum, factura) => sum + factura.Importe_Folio,
      0
    );
    this.iva = this.subtotal * this.IVA_PORCENTAJE;
    this.total = this.subtotal + this.iva;
  }

  cargarFormasPago() {
    this.authService.formasPagoGet().subscribe({
      next: (data) => {
        // Acceder directamente a la propiedad 'ListaFormaPago' del objeto de respuesta
        this.formasPago = data.ListaFormaPago;
        console.log(this.formasPago);
      },
      error: (error) => {
        console.error('Error al cargar las formas de pago:', error);
      },
    });
  }

  //PPD
  //PUE

  async facturar() {
    const datosParaEnviar = {
      rfc: this.rfc,
      foliosConcatenados: this.displayedData.map(factura => factura.Folio).join(', '),
      UsoCFDI: this.UsoCFDI,
      Usuario: localStorage.getItem('LUS_CLAVE'),
      NOMBRE_FISCAL: this.nombre,
      CP: this.CP,
      regimen: this.regimen,
      direccion: this.direccion,
      formaPagoSeleccionada: this.formaPagoSeleccionada,
      metodoPagoSeleccionado: this.metodoPagoSeleccionado
    };
  
    console.log('Enviando datos del formulario:', datosParaEnviar);

    const loading = await this.LoadingController.create({
      message: 'Facturando...', // Puedes personalizar este mensaje
    });
    await loading.present(); // Muestra el indicador de carga

    this.authService.getFacturarFolio(datosParaEnviar).subscribe({
      next: async (response) => {
        await loading.dismiss();
        if (response.codigo && response.codigo !== 0) { 
          console.error('Error al enviar los datos de facturación:', response.mensaje);
          // Muestra una alerta de error
          const alert = await this.AlertController.create({
           
            message: response.mensaje || 'Error no identificado. Por favor, intente nuevamente.',
            buttons: ['OK']
          });
          await alert.present();
        } else {
          console.log('Respuesta del servidor:', response);
          // Muestra una alerta de éxito
          const alert = await this.AlertController.create({
            header: 'Éxito',
            message: 'La facturación se ha realizado correctamente.',
            buttons: ['OK']
          });
          await alert.present();
        }
      },
      error: async (error) => {
        console.error('Error al enviar los datos de facturación:', error);
        await loading.dismiss();
        // Muestra una alerta de error
        const alert = await this.AlertController.create({
          header: 'Error',
          message: 'Error al enviar los datos de facturación. ' + (error.error.mensaje || 'Por favor, intente nuevamente.'),
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
  
  

  async salir() {
    await this.NavCtrl.navigateRoot('/index');
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
          popup: 'not_found_alert',
        },
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
          popup: 'not_found_alert',
        },
      }).then((result) => {
        if (result.isConfirmed) {
          console.log('Confirm Okay');
        }
      });
    }
    document.body.classList.remove('swal2-height-auto');
    loading.dismiss();
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
