import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyRegisterComponent } from './company-register.component';

describe('CompanyRegisterComponent', () => {
  let component: CompanyRegisterComponent;
  let fixture: ComponentFixture<CompanyRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
