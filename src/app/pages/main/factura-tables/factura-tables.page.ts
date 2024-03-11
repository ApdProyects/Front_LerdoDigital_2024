import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Factura } from 'src/app/models/Factura.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { forkJoin } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

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
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
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
    const lus_clave = '4600'; // Asumiendo que '4600' es un valor de ejemplo para la demostración

    if (lus_clave) {
      console.log('Lus_clave obtenido:', lus_clave);

      this.authService.getDatosFacturacion(lus_clave).subscribe({
        next: (response) => {
          console.log('Respuesta completa de la API:', response);

          if (response.ListaFacturas && response.ListaFacturas.length > 0) {
            console.log('Lista de Facturas:', response.ListaFacturas);

            // Aquí es donde necesitas asegurarte de asignar correctamente la respuesta
            this.facturasFiltradas = response.ListaFacturas; // Asigna la lista de facturas a facturasFiltradas
            this.calculateTotalPages(); // Recalcula el total de páginas basado en los nuevos datos
            this.currentPage = 1; // Opcionalmente, restablece a la primera página
            this.displayedData = this.getPagedData(); // Actualiza los datos mostrados en la tabla
          } else {
            console.log('No se encontraron facturas en la respuesta');
            this.facturasFiltradas = []; // Limpia la variable si no hay facturas
          }
          this.calculateTotalPages(); // Asegúrate de llamar a esto fuera del if para manejar también el caso de lista vacía
          this.displayedData = this.getPagedData();
        },
        error: (error) => {
          console.error('Error al obtener datos de la API', error);
          this.facturasFiltradas = []; // Limpia en caso de error
          this.calculateTotalPages(); // Recalcula las páginas incluso si hay un error
          this.displayedData = this.getPagedData();
        },
      });
    } else {
      console.log('No se encontró lus_clave.');
      this.facturasFiltradas = []; // Manejo cuando lus_clave no está disponible
      this.calculateTotalPages(); // Asegúrate de actualizar la paginación y los datos mostrados incluso si no hay datos
      this.displayedData = this.getPagedData();
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
    console.log('Enviando factura:', factura);
    const datosUsuario = {
      lus_clave: localStorage.getItem('LUS_CLAVE') || 'valor_por_defecto', // Por si acaso LUS_CLAVE no está definido
      numFactura: factura.NumeroFactura,
      RFC: factura.RFCFacturar,
    };

    console.log('Enviando datos al servidor:', datosUsuario);

    this.authService.getEnviarFactura(datosUsuario).subscribe({
      next: (res) => {
        console.log('Respuesta exitosa del servidor:', res);
        // Aquí podrías, por ejemplo, mostrar un mensaje de éxito al usuario
      },
      error: (error) => {
        console.error('Error en la solicitud:', error);
        // Aquí podrías, por ejemplo, mostrar un mensaje de error al usuario
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
