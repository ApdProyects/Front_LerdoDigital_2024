import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    {title : 'Inicio', url:'/home', icon:'home-outline'},
    {title : 'Servicios', url:'/servicios', icon:'folder-outline'},
    {title : 'Facturacion', url:'/facturacion', icon:'cash-outline'},
    {title : 'Perfil', url:'/profile', icon:'person-outline'},
  ]

  router = inject(Router);
  currentPath: string = '';


  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }

}
