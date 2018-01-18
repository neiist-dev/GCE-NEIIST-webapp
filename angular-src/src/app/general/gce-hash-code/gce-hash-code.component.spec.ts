import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GceHashCodeComponent } from './gce-hash-code.component';

describe('GceHashCodeComponent', () => {
  let component: GceHashCodeComponent;
  let fixture: ComponentFixture<GceHashCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GceHashCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GceHashCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
