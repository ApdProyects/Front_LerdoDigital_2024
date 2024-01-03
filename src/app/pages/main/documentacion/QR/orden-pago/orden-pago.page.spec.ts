import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdenPagoPage } from './orden-pago.page';

describe('OrdenPagoPage', () => {
  let component: OrdenPagoPage;
  let fixture: ComponentFixture<OrdenPagoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(OrdenPagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
