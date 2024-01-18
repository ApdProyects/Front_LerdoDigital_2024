import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  pages = [
    {title : 'Inicio', url:'/main/home', icon:'home-outline'},
    {title : 'Servicios', url:'/main/servicios', icon:'folder-outline'},
    {title : 'Contáctanos', url:'', icon:'mail-outline'},
    /* {title : 'Perfil', url:'/main/profile', icon:'person-outline'} */
  ]


  passto: string | undefined;
  public salida(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  async goContactanos() {
    this.passto = 'form-container-contacto';
    this.salida(this.passto);
  }
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  router = inject(Router);
  currentPath: string = '';


  ngOnInit() {
    this.router.events.subscribe((event: any)=>{
      if(event?.url) this.currentPath = event.url;
    })
  }

}
