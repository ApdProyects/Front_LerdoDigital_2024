import { Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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
}



