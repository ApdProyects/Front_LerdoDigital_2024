import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage  {
  isAlertOpen = false;
  alertButtons = ['Cerrar', 'Salir'];
  router: any;

  setOpen(isOpen: boolean) {
    this.isAlertOpen = isOpen;
    
  }

  handleAlertButtonClick(buttonIndex: number) {
    if (buttonIndex === 0) {
      // Acción para el botón 'Cerrar' (puedes dejarlo vacío o agregar lógica adicional)
    } else if (buttonIndex === 1) {
      // Acción para el botón 'Volver al Login'
      this.router.navigate(['/auth']); // Ajusta '/login' según la ruta de tu componente Auth
    }
  }
}