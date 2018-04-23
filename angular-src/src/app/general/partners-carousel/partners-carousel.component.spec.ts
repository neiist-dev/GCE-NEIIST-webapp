import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnersCarouselComponent } from './partners-carousel.component';

describe('PartnersCarouselComponent', () => {
  let component: PartnersCarouselComponent;
  let fixture: ComponentFixture<PartnersCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnersCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnersCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
