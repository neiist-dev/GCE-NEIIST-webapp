import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GAComponent } from './ga.component';

describe('GAComponent', () => {
  let component: GAComponent;
  let fixture: ComponentFixture<GAComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GAComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
