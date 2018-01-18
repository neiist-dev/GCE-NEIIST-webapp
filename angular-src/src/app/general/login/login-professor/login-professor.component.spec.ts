import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginProfessorComponent } from './login-professor.component';

describe('LoginProfessorComponent', () => {
  let component: LoginProfessorComponent;
  let fixture: ComponentFixture<LoginProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
