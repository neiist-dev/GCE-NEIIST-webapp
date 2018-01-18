import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardCompanyComponent } from './company-dashboard.component';

describe('DashboardCompanyComponent', () => {
  let component: DashboardCompanyComponent;
  let fixture: ComponentFixture<DashboardCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
