import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FacturaTablesPage } from './factura-tables.page';

describe('FacturaTablesPage', () => {
  let component: FacturaTablesPage;
  let fixture: ComponentFixture<FacturaTablesPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FacturaTablesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
