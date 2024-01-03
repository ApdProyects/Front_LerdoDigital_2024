import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EstadoDeCuentaPage } from './estado-de-cuenta.page';

describe('EstadoDeCuentaPage', () => {
  let component: EstadoDeCuentaPage;
  let fixture: ComponentFixture<EstadoDeCuentaPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(EstadoDeCuentaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
