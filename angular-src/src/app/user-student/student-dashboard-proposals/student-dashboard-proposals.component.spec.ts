import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentDashboardProposalsComponent } from './student-dashboard-proposals.component';

describe('StudentDashboardProposalsComponent', () => {
  let component: StudentDashboardProposalsComponent;
  let fixture: ComponentFixture<StudentDashboardProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentDashboardProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentDashboardProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
