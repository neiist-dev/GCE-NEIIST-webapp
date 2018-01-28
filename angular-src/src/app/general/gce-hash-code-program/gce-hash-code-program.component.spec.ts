import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GceHashCodeProgramComponent } from './gce-hash-code-program.component';

describe('GceHashCodeProgramComponent', () => {
  let component: GceHashCodeProgramComponent;
  let fixture: ComponentFixture<GceHashCodeProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GceHashCodeProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GceHashCodeProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
