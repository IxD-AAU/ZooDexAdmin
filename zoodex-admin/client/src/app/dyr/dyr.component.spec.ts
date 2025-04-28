import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyrComponent } from './dyr.component';

describe('DyrComponent', () => {
  let component: DyrComponent;
  let fixture: ComponentFixture<DyrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyrComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DyrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
