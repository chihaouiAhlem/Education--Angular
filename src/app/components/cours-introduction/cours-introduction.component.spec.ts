import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoursIntroductionComponent } from './cours-introduction.component';

describe('CoursIntroductionComponent', () => {
  let component: CoursIntroductionComponent;
  let fixture: ComponentFixture<CoursIntroductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursIntroductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursIntroductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
