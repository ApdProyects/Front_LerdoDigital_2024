import { Component, ElementRef, HostListener, OnInit, ViewChild,  ChangeDetectorRef } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';
import { Posts } from 'src/assets/data/images';
import { PostDetailComponent } from 'src/app/shared/components/post-detail/post-detail.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController, NavController, IonContent } from '@ionic/angular';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { register } from 'swiper/element';
import { Swiper } from 'swiper/types';

register();

declare var Email: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public isMobile: boolean;
  @ViewChild(IonContent, { static: false }) content: IonContent;


  posts: Post[] = [];
  loading: boolean = false;
  
  showScrollButton: boolean = false;


  form = {
    nombre: '',
    correo: '',
    to_name: 'Admin',
    message: 'MENSAJE IMPORTANTE',
    telefono: '',
  };

  @ViewChild('swiper')
  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  images2 = [
    {
      image: 'assets/fondoLerdo1.jpg',
      text: 'Lerdo\n\n\n\n\n\n\n\n\n\n\nDigital',
      buttonText: ' Conoce más',
      buttonAction: 'goConocenos',
    },
    {
      image: 'assets/fondoLerdo2.jpg',
      text: 'Paga tus servicios',
      subtitles: ['Predial', 'Vialidad', 'Parquímetros'],
    },
    {
      image: 'assets/fondoLerdo3.jpg',
      ImageSlide: 'assets/movil.png',
      text: 'Disponible en:',
      buttonText: ' Conoce más',
      buttonAction: 'goConocenos',
      secondButtonText: 'Descargar IOS',
      secondButtonAction: 'IOS',
      thirdButtonText: 'Descargar Android',
      thirdButtonAction: 'Android'
      
    },
    {
      image: 'assets/fondoLerdo4.jpg',
      text: 'Contáctanos',
      buttonText: ' Conoce más',
      buttonAction: 'goContactanos',
    },
  ];

  
  

  constructor(
    private utilsSvc: UtilsService,
    private AuthService: AuthService,
    private alertController: AlertController,
    private NavCtrl: NavController,
    private cdRef: ChangeDetectorRef
    
  ) {

  }

  scrollToTop() {
    this.content.scrollToTop(1500); // El número representa la duración en milisegundos.
  }

  logScrolling(e) {
    if (e.detail.scrollTop > 150) {
      this.showScrollButton = true;
    } else {
      this.showScrollButton = false;
    }
  }

  passto: string | undefined;

  public salida(className: string): void {
    const elementList = document.querySelectorAll('.' + className);
    const element = elementList[0] as HTMLElement;
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  SwiperReady() {
    this.swiper = this.swiperRef?.nativeElement.swiper;
  }

  async goConocenos() {
    this.passto = 'conoce-mun';
    this.salida(this.passto);
  }

  async goContactanos() {
    this.passto = 'form-container-contacto';
    this.salida(this.passto);
  }

  swiperSlideChanged(e: any) {
    console.log('Diapositiva cambiada: ', e);
    let currentIndex = e.activeIndex;
    console.log('Índice actual de la diapositiva: ', currentIndex);
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPosts();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      // Recargar la página completamente
      window.location.reload();
  
    }, 1000);
  }

  getPosts() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.posts = Posts;
    }, 1000);
    console.log(this.posts);
  }

  async showPostDetail(post: Post) {
    await this.utilsSvc.presentModal({
      component: PostDetailComponent,
      componentProps: { post },
      cssClass: 'modal-full-size',
    });
  }

  formatoCelularContacto(phoneNumber: string): string {
    // Remover cualquier caracter que no sea un número
    phoneNumber = phoneNumber.replace(/[^\d]/g, '');

    if (phoneNumber.length >= 10) {
      phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(
        3,
        6
      )}-${phoneNumber.slice(6)}`;
    }

    if (phoneNumber.length >= 14) {
      phoneNumber = phoneNumber.slice(0, 14);
    }

    return phoneNumber;
  }
  validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    console.log(re.test(String(email).toLowerCase()));
    return re.test(String(email).toLowerCase());
  }
  async alert(title: string, msg: string) {
    const alert = this.alertController.create({
      header: title,
      message: msg,
      buttons: ['Aceptar'],
    });
    (await alert).present();
  }
  async sendemail() {
    if (
      this.form.correo === '' ||
      this.form.telefono === '' ||
      this.form.nombre === ''
    ) {
      this.alert('Error', 'Favor de llenar todos los datos');
      return false;
    }

    if (this.form.nombre.length < 10) {
      this.alert('Error', 'El nombre debe tener al menos 9 caracteres');
      return;
    }
    if (String(this.form.telefono).length < 10) {
      this.alert('Error', 'El teléfono debe ser de al menos 10 dígitos');
      return;
    }
    if (!this.validateEmail(this.form.correo)) {
      this.alert('Error', 'El correo no es válido');
      return;
    }

    const templateParams = {
      to_name: this.form.to_name,
      from_name: this.form.nombre,
      from_email: this.form.correo,
      phone: this.form.telefono,
      message: this.form.message,
    };

    emailjs
      .send(
        'service_77zc03i',
        'template_hvsbn1k',
        templateParams,
        '87TM-X1oVUlPZqwc_'
      )
      .then(
        (res: EmailJSResponseStatus) => {
          console.log('SUCCESS!', res.status, res.text);
          this.alert('Éxito', 'Mensaje enviado correctamente');
          this.form = {
            nombre: '',
            correo: '',
            telefono: '',
            to_name: '', // Asegúrate de incluir todos los campos necesarios
            message: ''
          };
        },
        (error) => {
          console.error('FAILED...', error);
          this.alert('Error', 'Error al enviar el mensaje: ' + error.text);
        }
      );
  }

  /* emailjs.send("service_77zc03i","template_hvsbn1k",{
  from_name: "Lerdo",
  to_name: "test",
  from_email: "digitallerdo@gmail.com",
  phone: "8714706448",
  message: "hola",
  }); */
}
