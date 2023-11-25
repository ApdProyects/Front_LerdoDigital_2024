import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
