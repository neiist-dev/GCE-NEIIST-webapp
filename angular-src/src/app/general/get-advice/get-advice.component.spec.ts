import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAdviceComponent } from './get-advice.component';

describe('GetAdviceComponent', () => {
  let component: GetAdviceComponent;
  let fixture: ComponentFixture<GetAdviceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetAdviceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
