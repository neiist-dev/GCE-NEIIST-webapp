import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorProfileComponent } from './professor-profile.component';

describe('ProfessorProfileComponent', () => {
  let component: ProfessorProfileComponent;
  let fixture: ComponentFixture<ProfessorProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
