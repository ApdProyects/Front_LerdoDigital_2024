import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FolioPage } from './folio.page';

describe('FolioPage', () => {
  let component: FolioPage;
  let fixture: ComponentFixture<FolioPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(FolioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
