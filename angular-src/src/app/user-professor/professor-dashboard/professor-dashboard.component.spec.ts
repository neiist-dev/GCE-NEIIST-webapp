import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDashboardComponent } from './professor-dashboard.component';

describe('ProfessorDashboardComponent', () => {
  let component: ProfessorDashboardComponent;
  let fixture: ComponentFixture<ProfessorDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
