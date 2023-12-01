import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-folio',
  templateUrl: './folio.page.html',
  styleUrls: ['./folio.page.scss'],
})
export class FolioPage implements OnInit {

  form = new FormGroup({
   
    
    name: new FormControl('', [Validators.required, Validators.minLength(4)])
  });
  constructor() { }

  ngOnInit() {
  }

}
