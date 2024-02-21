import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura-tables',
  templateUrl: './factura-tables.page.html',
  styleUrls: ['./factura-tables.page.scss'],


})
export class FacturaTablesPage implements OnInit {
  facturas = [
    { numero: '5533', fecha: '23/02/2023', folio: 'sp1232456', nombre: 'Jose Antonio Nino Calamaco', rfc: 'NICA980410H70', importe: '500.00', sr: true },
    { numero: '5534', fecha: '24/02/2023', folio: 'sp1232451', nombre: 'Jose Antonio Nino Calamaco', rfc: 'NICA980410H70', importe: '646.00', sr: true },
    { numero: '5535', fecha: '25/02/2023', folio: 'sp1232452', nombre: 'Jose Antonio Nino Calamaco', rfc: 'NICA980410H70', importe: '595.00', sr: true },
    { numero: '5536', fecha: '26/02/2023', folio: 'sp1232453', nombre: 'Jose Antonio Nino Calamaco', rfc: 'NICA980410H70', importe: '643.00', sr: true },
    { numero: '5537', fecha: '27/02/2023', folio: 'sp1232454', nombre: 'Jose Antonio Nino Calamaco', rfc: 'NICA980410H70', importe: '589.00', sr: true },
    { numero: '6533', fecha: '23/02/2023', folio: 'sp7890123', nombre: 'Vanessa Herrera Soria', rfc: 'HESO990111M70', importe: '500.00', sr: true },
    { numero: '6534', fecha: '24/02/2023', folio: 'sp7890124', nombre: 'Vanessa Herrera Soria', rfc: 'HESO990111M70', importe: '646.00', sr: true },
    { numero: '6535', fecha: '25/02/2023', folio: 'sp7890125', nombre: 'Vanessa Herrera Soria', rfc: 'HESO990111M70', importe: '595.00', sr: true },
    { numero: '6536', fecha: '26/02/2023', folio: 'sp7890126', nombre: 'Vanessa Herrera Soria', rfc: 'HESO990111M70', importe: '643.00', sr: true },
    { numero: '6537', fecha: '27/02/2023', folio: 'sp7890127', nombre: 'Vanessa Herrera Soria', rfc: 'HESO990111M70', importe: '589.00', sr: true }
  ];

  facturasFiltradas = [];

  textoBusqueda: string = '';
  rfcBuscado: string = '';
  seleccionado: string | null = null; 
  facturaSeleccionada: any = null;



  constructor() { }

  ngOnInit() {


    this.facturasFiltradas = Array.from({ length: 1 }, () => ({
      numero: '-', // Proporciona un valor predeterminado
      fecha: '',
      folio: '',
      nombre: '',
      rfc: '',
      importe: '',
      sr: false
    }));

    this.clearInput()
  }


  buscar(rfcBuscado: string) {
    this.facturasFiltradas = this.facturas.filter(factura => factura.rfc.toLowerCase() === rfcBuscado.trim().toLowerCase());
    const resultados = this.facturas.filter(factura => factura.rfc.toLowerCase() === rfcBuscado.trim().toLowerCase());

    this.facturasFiltradas = resultados.length > 0 ? resultados : Array.from({ length: 1 }, () => ({
      numero: '', fecha: '', folio: '', nombre: '', rfc: '', importe: '', sr: false
    }));
  }

  onSearchbarInput(event: any) {
    this.buscar(event.target.value.toUpperCase());
  }
  
  seleccionarFactura() {
    if (this.facturaSeleccionada && this.facturaSeleccionada.numero === this.seleccionado) {
      this.seleccionado = null; 
      this.facturaSeleccionada = null;
    } else {
      this.facturaSeleccionada = this.facturas.find(factura => factura.numero === this.seleccionado);
    }
  }

  clearInput() {
    this. rfcBuscado = '';
  }
  
}
