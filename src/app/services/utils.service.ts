import { Injectable } from '@angular/core';
import { ModalController, ModalOptions } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

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



