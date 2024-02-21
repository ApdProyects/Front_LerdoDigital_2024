import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
})
export class LogoComponent  implements OnInit {
  @Input() User!: string;
  @Input() Logo!: string;
  miRutaDeImagen: string = 'assets/icon-dash.png';
  @Input() Titulo!: string;



  constructor() { }

  ngOnInit() {}

}
