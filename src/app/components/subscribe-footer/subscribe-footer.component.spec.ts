import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeFooterComponent } from './subscribe-footer.component';

describe('SubscribeFooterComponent', () => {
  let component: SubscribeFooterComponent;
  let fixture: ComponentFixture<SubscribeFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubscribeFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
