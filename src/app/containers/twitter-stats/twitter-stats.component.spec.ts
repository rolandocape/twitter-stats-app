import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TwitterStatsComponent} from './twitter-stats.component';

describe('TwitterStatsComponent', () => {
  let component: TwitterStatsComponent;
  let fixture: ComponentFixture<TwitterStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TwitterStatsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwitterStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
