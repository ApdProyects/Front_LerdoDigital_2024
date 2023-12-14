import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-info-folio',
  templateUrl: './info-folio.component.html',
  styleUrls: ['./info-folio.component.scss'],
})
export class InfoFolioComponent  implements OnInit {

  

  constructor(private authService: AuthService) {

   }

  ngOnInit() {}

}
