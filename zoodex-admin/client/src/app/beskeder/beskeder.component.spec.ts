import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeskederComponent } from './beskeder.component';

describe('BeskederComponent', () => {
  let component: BeskederComponent;
  let fixture: ComponentFixture<BeskederComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BeskederComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BeskederComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
