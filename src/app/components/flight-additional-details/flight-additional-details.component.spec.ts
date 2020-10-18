import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightAdditionalDetailsComponent } from './flight-additional-details.component';

describe('FlightAdditionalDetailsComponent', () => {
  let component: FlightAdditionalDetailsComponent;
  let fixture: ComponentFixture<FlightAdditionalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightAdditionalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightAdditionalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
