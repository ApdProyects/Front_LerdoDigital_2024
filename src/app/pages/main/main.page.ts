import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Router,  NavigationEnd } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MenuService } from 'src/app/services/menu.service';
import { Subscription } from 'rxjs';
import { SessionService } from 'src/app/services/session-service.service';




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
      url: '/main/facturacion2',
      icon: 'document-text-outline',
    },
     { title: 'Perfil', url: '/main/perfil', icon: 'person-outline' }, 
  ];

  activePages: Array<any>;
  nombreUsuario: string = '';
  private subscription: Subscription = new Subscription();


  changeMenu(page: string) {
    if (page === 'folio' || 'facturacion2' || 'perfil' || 'facturacion') {
      this.activePages = this.pagesServicios;
      console.log(this.pagesServicios);
    } else {
      this.activePages = this.pages;
      console.log(this.pages);
    }
    console.log('Menú cambiado a: ', page);
  }

  constructor(private router: Router, public menuService: MenuService,  private authService: AuthService,private NavCtrl: NavController,  private cdr: ChangeDetectorRef, private sessionService: SessionService
  ) {}

  async ngOnInit() {
    this.subscription.add(this.authService.nombreUsuario$.subscribe(nombre => {
      this.nombreUsuario = nombre;
    }));
    this.cargarDatosUsuario();
    
    this.menuService.changeMenu('default'); // Establecer menú por defecto
    this.router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        // Cambia el menú basado en la ruta
        if (event.url.includes('/folio') || event.url.includes('/facturacion2') || event.url.includes('/facturacion')   || event.url.includes('/perfil') || event.url.includes('/factura-table'))  {
          this.menuService.changeMenu('folio');
        } else {
          this.menuService.changeMenu('default');
        }
      }
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe(); // Limpia la suscripción
  }

  
  passto: string | undefined;
  public salida(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  cargarDatosUsuario() {
    const correoUsuario = localStorage.getItem('LUS_CORREO');

    if(correoUsuario){
      console.log('Correo obtenido desde localStorage:', correoUsuario);

    this.authService.getDatosUsuario(correoUsuario).subscribe({
      next: (datos) => {
        /* console.log('Datos del usuario recibidos desde la API:', datos); */
        this.nombreUsuario = datos.Usuario; 
        this.cdr.detectChanges();

      },
      error: (error) => console.error(error),

    });
  } else {
    console.log('No se encontró el correo del usuario en localStorage.');
  }}

  async goContactanos() {
    this.passto = 'form-container-contacto';
    this.salida(this.passto);
  }
  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  async salir() {
    console.log('Saliendo de la sesión...');
  
    // Eliminar los datos del localStorage
    localStorage.removeItem('LRO_CLAVE');
    localStorage.removeItem('LUS_CORREO');
    localStorage.removeItem('LUS_CLAVE');
  
    // Resetear el nombre de usuario en el servicio o componente
  
    // Redirigir al usuario a la página de inicio/home
    await this.NavCtrl.navigateRoot('/main/home');
    console.log('Redirigido a la página de inicio.');
  }
  
  

  currentPath: string = '';

 


}

