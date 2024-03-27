import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Facturacion2Page } from './facturacion2.page';

describe('Facturacion2Page', () => {
  let component: Facturacion2Page;
  let fixture: ComponentFixture<Facturacion2Page>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(Facturacion2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
