import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalCompanyComponent } from './company-add-proposal.component';

describe('ProposalCompanyComponent', () => {
  let component: ProposalCompanyComponent;
  let fixture: ComponentFixture<ProposalCompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProposalCompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProposalCompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
