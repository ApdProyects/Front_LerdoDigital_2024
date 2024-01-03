import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaNoInfraccionPage } from './carta-no-infraccion.page';

describe('CartaNoInfraccionPage', () => {
  let component: CartaNoInfraccionPage;
  let fixture: ComponentFixture<CartaNoInfraccionPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartaNoInfraccionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
