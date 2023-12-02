import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { FacturaFolioRfcComponent } from 'src/app/shared/factura-folio-rfc/factura-folio-rfc.component';
import { RfcDetailComponent } from 'src/app/shared/rfc-detail/rfc-detail.component';

@Component({
  selector: 'app-facturacion',
  templateUrl: './facturacion.page.html',
  styleUrls: ['./facturacion.page.scss'],
})
export class FacturacionPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email] ),
    phone: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private utilsSvc: UtilsService) { }

  ngOnInit() {
  }

  async showRfcDetail() {
    await this.utilsSvc.presentModal({
      component: RfcDetailComponent,
      componentProps: {  },
      cssClass: 'modal-full-size',
    });

}

async showFolioRfc() {
  await this.utilsSvc.presentModal({
    component: FacturaFolioRfcComponent,
    componentProps: {  },
    cssClass: 'modal-full-size',
  });

}}





