import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanyProposalsComponent } from './company-proposals.component';

describe('CompanyProposalsComponent', () => {
  let component: CompanyProposalsComponent;
  let fixture: ComponentFixture<CompanyProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanyProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanyProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
