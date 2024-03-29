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
import { catchError } from 'rxjs/operators';

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
    const loading = await this.LoadingController.create({
      message: 'Cargando facturas...',
      spinner: 'crescent', // Opcional: especifica el tipo de animación del spinner.
    });
    await loading.present();
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

  async cargarDatosUsuario() {
    const rfc = localStorage.getItem('ULTIMO_RFC');
    if (rfc) {
      // Si existe un RFC en localStorage, actualiza el modelo vinculado al ion-input
      this.rfc = rfc;
      console.log('RFC obtenido desde localStorage:', rfc);
    } else {
      console.log('No se encontró el RFC del usuario en localStorage.');
    }
    await this.LoadingController.dismiss();
  }

  async recuperarDatos() {
    if (this.rfc) {
      this.authService.recuperarDatosFiscales(this.rfc).subscribe({
        next: async (datos) => {
          // Verifica si los datos fiscales indican un RFC no existente
          if (
            datos.NOMBRE_FISCAL === 'NO INGRESADO' ||
            datos.CP_FISCAL === '--' ||
            datos.REGIMEN_FISCAL === '--' ||
            datos.DIRECCION_FISCAL === '--'
          ) {
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
      const alert = await this.AlertController.create({
        header: 'Error',
        message: 'RFC no proporcionado.',
        buttons: ['OK'],
      });
      await alert.present();
      console.error('Error: RFC no proporcionado.');
    }
  }

  async abrirAltaRfcModal() {
    const modal = await this.modalController.create({
      component: AltaRfcModalComponent,
      // Puedes pasar datos al modal si es necesario
      componentProps: { rfc: this.rfc },
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
      const folioLength = this.folio.length;
      if ([11, 13, 16, 17].includes(folioLength)) {
        this.authService.recuperaFolioGrid(this.folio).subscribe({
          next: async (datos) => {
            // Verifica si el mensaje indica que el folio ya fue facturado
            if (datos.MENSAJE != '' || datos.MENSAJE == null) {
              // if (datos.MENSAJE.includes('ya fue facturado')) {
              //   await this.mostrarAlerta('Aviso', datos.MENSAJE);
              // } else if (datos.MENSAJE.includes('no registrado en ingresos')) {
              //   // Aquí manejas el caso específico cuando el folio no es válido
              //   await this.mostrarAlerta('Folio no válido', datos.MENSAJE);
              // } else if ()
              await this.mostrarAlerta('', datos.MENSAJE);

            } else {
              this.displayedData.push({
                Folio: this.folio,
                Descripcion_Folio: datos.Descripcion_Folio,
                Importe_Folio: datos.Importe_Folio,
              });
              console.log(datos);
              this.calcularTotales();
            }
            this.folio = ''; 
          },
          error: async (error) => {
            console.error('Error al recuperar los datos fiscales:', error);
            // Manejar errores de la petición
          },
        });
      } else {
        const alert = await this.AlertController.create({
          header: 'Error',
          message: 'Folio no valido',
          buttons: ['OK'],
        });
        await alert.present();
      }
    } else {
      const alert = await this.AlertController.create({
        header: 'Error',
        message: 'Folio no proporcionado.',
        buttons: ['OK'],
      });
      await alert.present();
      console.error('Error: Folio no proporcionado.');
    }
  }

  // Función genérica para mostrar alertas
  async mostrarAlerta(header, mensaje) {
    const alert = await this.AlertController.create({
      header: header,
      message: mensaje,
      buttons: ['OK'],
    });
    await alert.present();
  }

  async mostrarAlertaFolioPagado(mensaje: string) {
    const alert = await this.AlertController.create({
      header: 'Folio Facturado',
      message: mensaje,
      buttons: ['OK'],
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
        this.formasPago = data.ListaFormaPago;
        console.log(this.formasPago);
      },
      error: (error) => {
        console.error('Error al cargar las formas de pago:', error);
      },
    });
  }

  recargarComponente() {
    let urlActual = this.router.url;
    this.router.navigateByUrl('./facturacion2', { skipLocationChange: true }).then(() => {
      this.router.navigate([urlActual]);
    });
  }

  //PPD
  //PUE

  async facturar() {
    const datosParaEnviar = {
      rfc: this.rfc,
      foliosConcatenados: this.displayedData
        .map((factura) => factura.Folio)
        .join(', '),
      UsoCFDI: this.UsoCFDI,
      Usuario: localStorage.getItem('LUS_CLAVE'),
      NOMBRE_FISCAL: this.nombre,
      CP: this.CP,
      regimen: this.regimen,
      direccion: this.direccion,
      formaPagoSeleccionada: this.formaPagoSeleccionada,
      metodoPagoSeleccionado: this.metodoPagoSeleccionado,
    };

    let errores: any = 0 ;

    if(datosParaEnviar.NOMBRE_FISCAL == '' || datosParaEnviar.rfc == '' ||  datosParaEnviar.CP == '' ||  datosParaEnviar.regimen == ''){
      const alert = await this.AlertController.create({
        message: 'Falta cargar datos fiscales',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              window.location.reload(); 
            },
          },
        ],
       
        
      });
      await alert.present();
      errores = 1
    }

    if (datosParaEnviar.foliosConcatenados.length <= 2) {
      const alert = await this.AlertController.create({
        message: ' Ingresa un folio para facturar.',
        buttons: ['OK'],
      });
      await alert.present();
      errores = 1
    } 

    if(datosParaEnviar.formaPagoSeleccionada == undefined){
      const alert = await this.AlertController.create({
        message: 'Selecciona una forma de pago',
        buttons: ['OK'],
      });
      await alert.present();
      errores = 1
    }

    if(datosParaEnviar.metodoPagoSeleccionado == ''){
      const alert = await this.AlertController.create({
        message: 'Selecciona un metodo de pago',
        buttons: ['OK'],
      });
      await alert.present();
      errores = 1
    }

    if(errores == 0 ){
      console.log('Enviando datos del formulario:', datosParaEnviar);

      const loading = await this.LoadingController.create({
        message: 'Facturando...', 
      });
      await loading.present(); 

      this.authService.getFacturarFolio(datosParaEnviar)
      .pipe(
        catchError(
          async (error)=>{
            console.error('Error al enviar los datos de facturación:', error);
          await loading.dismiss();
          // Muestra una alerta de error
          let mensajeError =
            'Error al enviar los datos de facturación. Por favor, intente nuevamente.';

          // Verifica si hay mensajes de error específicos en 'mensajeList' y los concatena.
          if (error.error.mensajeList && error.error.mensaje.length > 0) {
            const erroresListados = error.error.mensaje.join(' '); // Une todos los mensajes con un espacio.
            mensajeError = `${error.error.mensaje} ${erroresListados}`;
          }
          const alert = await this.AlertController.create({
            header: 'Error',
            message: error.error.mensaje || 'Por favor, intente nuevamente.',
            buttons: ['OK'],
          });
          await alert.present();
            return error;
          }
        )
      )
      .subscribe(
        async (response:any)=>{

          // debugger;
          if (response.codigo  === 0) {
            await loading.dismiss();
            console.error(
              'Error al enviar los datos de facturación:',
              response.mensajeList
            );

            const alert = await this.AlertController.create({
              message: response.mensaje || ' Por favor, intente nuevamente.',
              buttons: [  {
                text: 'OK',
                handler: async() => {
                  await alert.dismiss();
                  setTimeout(() => {
                    // window.location.reload();
                  }, 100);
                },
              },],
            });
            await alert.present();

            return 1;
          }

          if(response.codigo === 1){

            await loading.dismiss();
            console.log('Respuesta del servidor:', response);
         
            // Muestra una alerta de éxito
            const alert = await this.AlertController.create({
              header: 'Éxito',
              message: 'La facturación se ha realizado correctamente.',
              buttons: [
                {
                  text: 'OK',
                  handler: async() => {
                    await alert.dismiss();
                    window.location.reload();
                  },
                },
              ],
            });
            await alert.present();
            return 1;
          }
        }
      );

    }
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
    if (this.platform.is('mobile') || 'web') {
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
