import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';
import { InfoFolioComponent } from 'src/app/shared/components/info-folio/info-folio.component';

@Component({
  selector: 'app-folio',
  templateUrl: './folio.page.html',
  styleUrls: ['./folio.page.scss'],
})
export class FolioPage implements OnInit {

  form = new FormGroup({
   
    
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  constructor(private utilsSvc: UtilsService) { }

  ngOnInit() {
  }

  
async showFolioInfo() {
  await this.utilsSvc.presentModal({
    component: InfoFolioComponent,
    componentProps: {  },
    cssClass: 'modal-full-size',
  });

}}



