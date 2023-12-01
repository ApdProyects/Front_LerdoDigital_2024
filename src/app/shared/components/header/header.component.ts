import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {

  @Input() title!:string;
  @Input() backButton!:string;
  @Input() isModal!:string;
  @Input() MenuButton!:string;
  @Input() shouldShowHorizontalMenu!:string;
  @Input() Logo!:string;
  

  constructor( private utilsSvc: UtilsService) { }

  ngOnInit() {}

    dismissModal(){
    this.utilsSvc.dismissModal()
  }

  }