import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SalidaParaCorralonPage } from './salida-para-corralon.page';

describe('SalidaParaCorralonPage', () => {
  let component: SalidaParaCorralonPage;
  let fixture: ComponentFixture<SalidaParaCorralonPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SalidaParaCorralonPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
