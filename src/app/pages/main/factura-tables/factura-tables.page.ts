import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Factura } from 'src/app/models/Factura.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, LoadingController, isPlatform } from '@ionic/angular';
import { Filesystem, Directory } from '@capacitor/filesystem';

@Component({
  selector: 'app-factura-tables',
  templateUrl: './factura-tables.page.html',
  styleUrls: ['./factura-tables.page.scss'],
})
export class FacturaTablesPage implements OnInit {
  facturasFiltradas: any[] = [];
  listaOriginalFacturas: any = '';
  seleccionado: any = null;
  facturaSeleccionada: any = null;

  currentPage: number = 1;
  pageSize: number = 5; // Cantidad de elementos por página
  totalPages: number;

  form = new FormGroup({
    numero: new FormControl(''), // Ejemplo con validación
    fecha: new FormControl(''),
    folio: new FormControl(''),
    nombre: new FormControl(''),
    rfc: new FormControl(''),
    importe: new FormControl(0, Validators.pattern(/^\d+\.?\d{0,2}$/)),
  });
  lus_clave: any;
  textoBusqueda: string;
  displayedData: any[] = []; // Los datos que se muestran actualmente en la tabla

  constructor(
    private router: Router,
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {}

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Cargando facturas...',
      spinner: 'crescent', // Opcional: especifica el tipo de animación del spinner.
    });
    await loading.present(); // Muestra el indicador de carga.
    this.facturasFiltradas = Array.from({ length: 1 }, () => ({
      numero: '-', // Proporciona un valor predeterminado
      fecha: '',
      folio: '',
      nombre: '',
      rfc: '',
      importe: '',
      sr: false,
    }));

    this.clearInput();
    this.cargarDatosFacturacion();
    this.calculateTotalPages();
    this.displayedData = this.getPagedData();
  }

  cargarDatosFacturacion(): void {
    const lus_clave = localStorage.getItem('LUS_CLAVE');

    if (lus_clave) {
      console.log('Lus_clave obtenido:', lus_clave);

      this.authService.getDatosFacturacion(lus_clave).subscribe({
        next: async (response) => {
          console.log('Respuesta completa de la API:', response);

          if (response.ListaFacturas && response.ListaFacturas.length > 0) {
            console.log('Lista de Facturas:', response.ListaFacturas);

            // Aquí es donde necesitas asegurarte de asignar correctamente la respuesta
            this.facturasFiltradas = response.ListaFacturas; // Asigna la lista de facturas a facturasFiltradas
            this.calculateTotalPages(); // Recalcula el total de páginas basado en los nuevos datos
            this.currentPage = 1; // Opcionalmente, restablece a la primera página
            this.displayedData = this.getPagedData(); // Actualiza los datos mostrados en la tabla
            await this.loadingController.dismiss();

          } else {
            console.log('No se encontraron facturas en la respuesta');
            this.facturasFiltradas = []; // Limpia la variable si no hay facturas
          }
          this.calculateTotalPages(); // Asegúrate de llamar a esto fuera del if para manejar también el caso de lista vacía
          this.displayedData = this.getPagedData();
        },
        error: async (error) => {
          console.error('Error al obtener datos de la API', error);
          this.facturasFiltradas = []; // Limpia en caso de error
          this.calculateTotalPages(); // Recalcula las páginas incluso si hay un error
          this.displayedData = this.getPagedData();
          await this.loadingController.dismiss();
        },
      });
    } else {
      console.log('No se encontró lus_clave.');
      this.facturasFiltradas = []; // Manejo cuando lus_clave no está disponible
      this.calculateTotalPages(); // Asegúrate de actualizar la paginación y los datos mostrados incluso si no hay datos
      this.displayedData = this.getPagedData();
      this.loadingController.dismiss();

    }
  }

  filtrarFacturas(valorBusqueda: string) {
    if (!this.listaOriginalFacturas) {
      this.listaOriginalFacturas = [...this.facturasFiltradas];
    }

    if (valorBusqueda && valorBusqueda.trim() !== '') {
      this.displayedData = this.listaOriginalFacturas.filter((factura) => {
        return factura.NumeroFactura.toString().includes(valorBusqueda);
      });
    } else {
      // Restablece la lista de facturas a la lista original si el campo de búsqueda está vacío
      this.displayedData = [...this.listaOriginalFacturas];
    }
  }

  toggleSeleccion(facturaSeleccionada: any) {
    // Verificar si el usuario está deseleccionando la factura actualmente seleccionada
    if (
      this.facturaSeleccionada &&
      this.facturaSeleccionada.numero === facturaSeleccionada.numero
    ) {
      this.facturaSeleccionada = null;
    } else {
      this.facturaSeleccionada = facturaSeleccionada;
    }

    // Actualizar el estado 'habilitado' basado en la factura seleccionada
    this.displayedData = this.displayedData.map((factura) => ({
      ...factura,
      habilitado:
        this.facturaSeleccionada &&
        this.facturaSeleccionada.numero === factura.numero,
    }));

    console.log(
      `Seleccionado: ${this.seleccionado}`,
      `Factura Seleccionada:`,
      this.facturaSeleccionada
    );
  }

  seleccionarFila(factura: any) {
    this.seleccionado = factura;
  }

  clearInput() {
    this.listaOriginalFacturas = '';
  }

  mostrarNuevaFactura() {
    this.router.navigate(['main/facturacion']);
    /*     this.mostrarFormulario = true;
    this.facturaEnProgreso = {
      numero: '',
      fecha: '',
      folio: '',
      nombre: '',
      rfc: '',
      importe: '',
     
    }; */
  }

  buscarFactura() {
    this.filtrarFacturas(this.textoBusqueda);
  }

  generarFactura() {
    if (this.form.valid) {
      // Aquí puedes añadir `nuevaFactura` a tu arreglo de facturas, enviarla a un servidor, etc.
      this.form.reset(); // Limpia el formulario
    }
  }

  calculateTotalPages() {
    this.totalPages = Math.ceil(this.facturasFiltradas.length / this.pageSize);
  }

  updateData(newData: any[]) {
    this.facturasFiltradas = newData;
    this.calculateTotalPages();
    this.currentPage = 1; // Vuelve a la primera página al cargar nuevos datos o aplicar un filtro
    this.displayedData = this.getPagedData();
  }

  getPagedData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.facturasFiltradas.slice(startIndex, endIndex); // Asegúrate de que esta función devuelve un arreglo
  }

  changePage(newPage: number) {
    if (newPage >= 1 && newPage <= this.totalPages) {
      this.currentPage = newPage;
      this.displayedData = this.getPagedData(); // Asegúrate de actualizar los datos mostrados
    }
  }

  async enviarFactura(factura: any) {
    // Muestra el indicador de carga
    const loading = await this.loadingController.create({
      message: 'Enviando factura...',
    });
    await loading.present();

    const datosUsuario = {
      lus_clave: localStorage.getItem('LUS_CLAVE') || 'valor_por_defecto',
      numFactura: factura.NumeroFactura,
      RFC: factura.RFCFacturar,
    };

    // Simula una operación asíncrona como el envío de datos al servidor
    this.authService.getEnviarFactura(datosUsuario).subscribe({
      next: async (res) => {
        // Primero, cierra el indicador de carga
        await loading.dismiss();

        // Luego muestra el alerta de éxito
        const alert = await this.alertController.create({
          header: 'Éxito',
          message: 'Correo enviado exitosamente.',
          buttons: ['OK'],
        });

        await alert.present();
      },
      error: async (error) => {
        // Cierra el indicador de carga en caso de error
        await loading.dismiss();

        // Muestra el alerta de error
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'Error al enviar el correo. Por favor, intenta de nuevo.',
          buttons: ['OK'],
        });

        await alert.present();
      },
    });
  }

  async descargarFactura(factura: any) {
    console.log('Descargando factura:', factura);
    const datosUsuario = {
      numFactura: factura.NumeroFactura,
      RFC: factura.RFCFacturar,
    };

    // Prepara las peticiones para descargar PDF y XML
    const peticionPDF = this.authService.getDescargarPDF(datosUsuario);
    const peticionXML = this.authService.getDescargarXML(datosUsuario);

    // Ejecuta ambas peticiones en paralelo y espera a que ambas completen
    forkJoin([peticionPDF, peticionXML]).subscribe({
      next: (res) => {
        console.log('Respuestas exitosas del servidor:', res);
        // Asumiendo que `res[0]` y `res[1]` contienen los datos binarios de PDF y XML respectivamente
        // Descargar PDF
        this.descargarArchivo(res[0], `Factura-${datosUsuario.numFactura}.pdf`);
        // Descargar XML
        this.descargarArchivo(res[1], `Factura-${datosUsuario.numFactura}.xml`);
      },
      error: (error) => {
        console.error('Error en las solicitudes:', error);
        // Maneja el error, posiblemente mostrando un mensaje al usuario
      },
    });
  }
  descargarArchivo(data: Blob, nombreArchivo: string) {
    if (isPlatform('hybrid')) {
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onloadend = async () => {
        const base64 = reader.result as string;
        // Asegúrate de obtener la parte correcta de la cadena base64 para los datos del archivo
        const base64Data = base64.split(',')[1];
        try {
          await Filesystem.writeFile({
            path: nombreArchivo,
            data: base64Data,
            directory: Directory.Documents,
          });
          console.log('Archivo guardado en el dispositivo:', nombreArchivo);
          // Mostrar alerta de éxito
          this.presentAlert(
            'Descarga completa',
            `El archivo ${nombreArchivo} ha sido guardado en Documentos.`
          );
        } catch (e) {
          console.error('Error al guardar el archivo:', e);
          // Mostrar alerta de error
          this.presentAlert('Error', 'No se pudo guardar el archivo.');
        }
      };
      reader.onerror = (error) => {
        // Manejar errores de FileReader
        console.error('Error al leer el archivo:', error);
        this.presentAlert(
          'Error',
          'Error al procesar el archivo para su descarga.'
        );
      };
      reader.readAsDataURL(data);
    } else {
      // Para navegadores web, sigue el proceso normal
      const url = window.URL.createObjectURL(data);
      const a = document.createElement('a');
      a.href = url;
      a.download = nombreArchivo;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  }
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
