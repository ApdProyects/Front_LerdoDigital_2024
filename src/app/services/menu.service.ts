import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MenuService {
  activeMenu: string = 'default';

  changeMenu(menu: string) {
    
    this.activeMenu = menu;}
    
  constructor() { }

  
}
