import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonaleComponent } from './personale.component';

describe('PersonaleComponent', () => {
  let component: PersonaleComponent;
  let fixture: ComponentFixture<PersonaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PersonaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PersonaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
