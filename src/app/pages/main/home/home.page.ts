import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { UtilsService } from 'src/app/services/utils.service';
import { Posts } from 'src/assets/data/images';
import { PostDetailComponent } from 'src/app/shared/components/post-detail/post-detail.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertController } from '@ionic/angular';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';


declare  var Email: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  posts: Post[] = [];
  loading: boolean = false;

  form = {
    nombre: '',
    correo: '',
    to_name: 'Admin',
    message:'MENSAJE IMPORTANTE',
    telefono: ''
  };

  constructor(
    private utilsSvc: UtilsService,
    private AuthService: AuthService,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.getPosts();
  }

  doRefresh(event: any) {
    setTimeout(() => {
      this.getPosts();

      event.target.complete();
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
      phoneNumber = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6)}`;
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
  async alert(title:  string, msg: string) {
    const alert = this.alertController.create({
      header: title,
      message: msg,
      buttons: ['Aceptar'],
    });
    (await alert).present();
  }
  async sendemail() {
    if (this.form.correo === '' || this.form.telefono === '' || this.form.nombre === '') {
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
        from_email : this.form.correo,
        phone: this.form.telefono,
        message: this.form.message
    };

    emailjs.send('service_77zc03i', 'template_hvsbn1k', templateParams, '87TM-X1oVUlPZqwc_')
    .then((res: EmailJSResponseStatus) => {
        console.log('SUCCESS!', res.status, res.text);
        this.alert('Éxito', 'Mensaje enviado correctamente');
    }, (error) => {
        console.error('FAILED...', error);
        this.alert('Error', 'Error al enviar el mensaje: ' + error.text);
    });
}

/* emailjs.send("service_77zc03i","template_hvsbn1k",{
  from_name: "Lerdo",
  to_name: "test",
  from_email: "digitallerdo@gmail.com",
  phone: "8714706448",
  message: "hola",
  }); */

}