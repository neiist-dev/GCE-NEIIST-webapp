import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginStudentComponent } from './login-student.component';

describe('LoginStudentComponent', () => {
  let component: LoginStudentComponent;
  let fixture: ComponentFixture<LoginStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
