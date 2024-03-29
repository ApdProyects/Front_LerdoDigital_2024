import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-rfc-detail',
  templateUrl: './rfc-detail.component.html',
  styleUrls: ['./rfc-detail.component.scss'],
})
export class RfcDetailComponent  implements OnInit {

  form = new FormGroup({
   
    
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(    private utilsSvc: UtilsService
    ) { }

  ngOnInit() {}

}
