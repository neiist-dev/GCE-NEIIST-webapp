import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyMyProposalsComponent } from './company-my-proposals.component';

describe('CompanyMyProposalsComponent', () => {
  let component: CompanyMyProposalsComponent;
  let fixture: ComponentFixture<CompanyMyProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyMyProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyMyProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
