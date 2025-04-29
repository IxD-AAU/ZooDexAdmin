import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyrInfoEditComponent } from './dyr-info-edit.component';

describe('DyrInfoEditComponent', () => {
  let component: DyrInfoEditComponent;
  let fixture: ComponentFixture<DyrInfoEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyrInfoEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DyrInfoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
