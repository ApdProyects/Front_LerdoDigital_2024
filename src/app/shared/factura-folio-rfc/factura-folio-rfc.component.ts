import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-factura-folio-rfc',
  templateUrl: './factura-folio-rfc.component.html',
  styleUrls: ['./factura-folio-rfc.component.scss'],
})
export class FacturaFolioRfcComponent  implements OnInit {

  constructor(  private utilsSvc: UtilsService ) { }

  ngOnInit() {}

}
