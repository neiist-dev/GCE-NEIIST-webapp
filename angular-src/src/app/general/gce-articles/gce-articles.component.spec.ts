import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GceArticlesComponent } from './gce-articles.component';

describe('GceArticlesComponent', () => {
  let component: GceArticlesComponent;
  let fixture: ComponentFixture<GceArticlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GceArticlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GceArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
