import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FbComponent } from './fb.component';

describe('FbComponent', () => {
  let component: FbComponent;
  let fixture: ComponentFixture<FbComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FbComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
