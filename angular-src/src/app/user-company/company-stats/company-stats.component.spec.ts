import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyStatsComponent } from './company-stats.component';

describe('CompanyStatsComponent', () => {
  let component: CompanyStatsComponent;
  let fixture: ComponentFixture<CompanyStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
