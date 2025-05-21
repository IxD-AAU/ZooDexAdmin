import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsInfoComponent } from './events-info.component';

describe('EventsInfoComponent', () => {
  let component: EventsInfoComponent;
  let fixture: ComponentFixture<EventsInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventsInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventsInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
