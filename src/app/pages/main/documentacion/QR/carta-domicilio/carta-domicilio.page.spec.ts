import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaDomicilioPage } from './carta-domicilio.page';

describe('CartaDomicilioPage', () => {
  let component: CartaDomicilioPage;
  let fixture: ComponentFixture<CartaDomicilioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartaDomicilioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
