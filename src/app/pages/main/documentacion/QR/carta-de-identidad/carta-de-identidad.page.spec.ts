import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CartaDeIdentidadPage } from './carta-de-identidad.page';

describe('CartaDeIdentidadPage', () => {
  let component: CartaDeIdentidadPage;
  let fixture: ComponentFixture<CartaDeIdentidadPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CartaDeIdentidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
