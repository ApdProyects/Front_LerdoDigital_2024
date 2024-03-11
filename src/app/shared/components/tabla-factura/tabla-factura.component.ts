import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'app-tabla-factura',
  templateUrl: './tabla-factura.component.html',
  styleUrls: ['./tabla-factura.component.scss'],
})
export class TablaFacturaComponent  implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,  private utilsSvc: UtilsService, private router: Router, private modalController: ModalController) {
    this.form = this.fb.group({
      folios: this.fb.array([this.createFolio()])
    });
  }

  ngOnInit() {}

  get folios() {
    return this.form.get('folios') as FormArray;
  }

  createFolio(): FormGroup {
    return this.fb.group({
      folio: ''
    });
  }

  agregarFolio() {
    this.folios.push(this.createFolio());
  }

  eliminarFolio(index: number) {
    this.folios.removeAt(index);
    
  }
  async enviarFolio() {
    const foliosConcatenados = this.folios.controls
      .map(control => control.get('folio').value) // Obtén el valor de cada folio
      .filter(folio => folio.trim() !== '') // Opcional: filtra folios vacíos o solo con espacios
      .join(', '); // Concatena los valores con una coma y espacio
      console.log('Folios a enviar:', foliosConcatenados);

   
      this.utilsSvc.changeFolio(foliosConcatenados);
        // Navega a la página de facturación después de enviar los folios
        await this.modalController.dismiss();
    
  }}

