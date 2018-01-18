import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowAllProposalsComponent } from './show-all-proposals.component';

describe('ShowAllProposalsComponent', () => {
  let component: ShowAllProposalsComponent;
  let fixture: ComponentFixture<ShowAllProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowAllProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowAllProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
