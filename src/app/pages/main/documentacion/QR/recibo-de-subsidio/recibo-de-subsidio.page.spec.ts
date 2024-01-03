import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReciboDeSubsidioPage } from './recibo-de-subsidio.page';

describe('ReciboDeSubsidioPage', () => {
  let component: ReciboDeSubsidioPage;
  let fixture: ComponentFixture<ReciboDeSubsidioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(ReciboDeSubsidioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
