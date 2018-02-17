import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GceThesisComponent } from './gce-thesis.component';

describe('GceThesisComponent', () => {
  let component: GceThesisComponent;
  let fixture: ComponentFixture<GceThesisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GceThesisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GceThesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
