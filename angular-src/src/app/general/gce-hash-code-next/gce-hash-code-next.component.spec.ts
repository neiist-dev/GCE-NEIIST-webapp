import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GceHashCodeNextComponent } from './gce-hash-code-next.component';

describe('GceHashCodeNextComponent', () => {
  let component: GceHashCodeNextComponent;
  let fixture: ComponentFixture<GceHashCodeNextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GceHashCodeNextComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GceHashCodeNextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
