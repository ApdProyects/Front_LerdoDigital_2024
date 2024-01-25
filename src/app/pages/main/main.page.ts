import { Component, OnInit, inject } from '@angular/core';
import { Router,  NavigationEnd } from '@angular/router';
import { MenuService } from 'src/app/services/menu.service';



@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {
  pages = [
    { title: 'Inicio', url: '/main/home', icon: 'home-outline' },
    { title: 'Servicios', url: '/main/servicios', icon: 'folder-outline' },
    { title: 'Contáctanos', url: '', icon: 'mail-outline' },
  ];

  pagesServicios = [
    { title: 'Pagos', url: '/main/folio', icon: 'cash-outline' },
    {
      title: 'Facturación',
      url: '/main/facturacion',
      icon: 'document-text-outline',
    }/* ,
    { title: 'Perfil', url: '/main/perfil', icon: 'person-outline' }, */
  ];

  activePages: Array<any>;

  changeMenu(page: string) {
    if (page === 'folio' || 'facturacion' || 'perfil') {
      this.activePages = this.pagesServicios;
      console.log(this.pagesServicios);
    } else {
      this.activePages = this.pages;
      console.log(this.pages);
    }
    console.log('Menú cambiado a: ', page);
  }

  constructor(private router: Router, public menuService: MenuService,) {}

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

  currentPath: string = '';

  ngOnInit() {
    this.menuService.changeMenu('default'); // Establecer menú por defecto
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Cambia el menú basado en la ruta
        if (event.url.includes('/folio') || event.url.includes('/facturacion')  || event.url.includes('/perfil')) {
          this.menuService.changeMenu('folio');
        } else {
          this.menuService.changeMenu('default');
        }
      }
    });
  }


}

