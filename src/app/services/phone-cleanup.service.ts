import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PhoneCleanupService {
  constructor() {}
  cleanPhoneNumber(phoneNumber: string): string {
    console.log('Original:', phoneNumber);
    phoneNumber = phoneNumber.replace(/[-()%]/g, "");
    console.log('Limpio:', phoneNumber);
    return phoneNumber
  }
}
