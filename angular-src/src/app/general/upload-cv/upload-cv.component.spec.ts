import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadCvComponent } from './upload-cv.component';

describe('UploadCvComponent', () => {
  let component: UploadCvComponent;
  let fixture: ComponentFixture<UploadCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
