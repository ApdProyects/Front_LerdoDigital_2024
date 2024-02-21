import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-factura-tables',
  templateUrl: './factura-tables.page.html',
  styleUrls: ['./factura-tables.page.scss'],


})
export class FacturaTablesPage implements OnInit {

  textoBusqueda: string = '';


  constructor() { }

  ngOnInit() {
    this.buscar
  }

  buscar() {
    console.log('Realizar búsqueda');
    // Aquí implementas tu lógica de búsqueda
  }
  
  

  rows = [
    { name: 'Austin', gender: 'Male', company: 'Swimlane' },
    { name: 'Dany', gender: 'Male', company: 'KFC' },
    { name: 'Molly', gender: 'Female', company: 'Burger King' }
  ];
  columns = [{ prop: 'name' }, { name: 'Gender' }, { name: 'Company' }];

}
