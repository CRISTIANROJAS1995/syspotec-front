import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoverUploadComponent } from './cover-upload.component';

describe('CoverUploadComponent', () => {
  let component: CoverUploadComponent;
  let fixture: ComponentFixture<CoverUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoverUploadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoverUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
