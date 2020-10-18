import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightMainDetailsComponent } from './flight-main-details.component';

describe('FlightMainDetailsComponent', () => {
  let component: FlightMainDetailsComponent;
  let fixture: ComponentFixture<FlightMainDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlightMainDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightMainDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
