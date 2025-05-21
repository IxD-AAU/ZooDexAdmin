import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DyrCreateComponent } from './dyr-create.component';

describe('DyrCreateComponent', () => {
  let component: DyrCreateComponent;
  let fixture: ComponentFixture<DyrCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DyrCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DyrCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
