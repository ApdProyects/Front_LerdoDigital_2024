import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { ModalController, ModalOptions } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  static matchValues(toCompare: AbstractControl){
    return (control: AbstractControl) => {
      if(control.value !== toCompare.value) return {noMatch:true}
      return null
    }
  }

  private folioSource = new BehaviorSubject<string>('');

  currentFolio = this.folioSource.asObservable();


  constructor(
    private modalController: ModalController
  ) { }





  async presentModal(opts: ModalOptions){
    const modal = await this.modalController.create(opts);
    await modal.present();
  }

dismissModal(){
  return this.modalController.dismiss()
}

changeFolio(folio: string) {
  this.folioSource.next(folio);
}

}



