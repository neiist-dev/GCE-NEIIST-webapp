import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsUsageComponent } from './terms-usage.component';

describe('TermsUsageComponent', () => {
  let component: TermsUsageComponent;
  let fixture: ComponentFixture<TermsUsageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsUsageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsUsageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
