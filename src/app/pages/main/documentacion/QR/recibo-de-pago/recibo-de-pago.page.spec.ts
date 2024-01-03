import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReciboDePagoPage } from './recibo-de-pago.page';

describe('ReciboDePagoPage', () => {
  let component: ReciboDePagoPage;
  let fixture: ComponentFixture<ReciboDePagoPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReciboDePagoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
