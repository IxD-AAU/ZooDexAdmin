import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyrInfoComponent } from './dyr-info.component';

describe('DyrInfoComponent', () => {
  let component: DyrInfoComponent;
  let fixture: ComponentFixture<DyrInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyrInfoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DyrInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
