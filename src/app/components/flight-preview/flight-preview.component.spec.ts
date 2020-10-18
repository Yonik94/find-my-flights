import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimePipe } from '../../pipes/time/time.pipe'
import { FlightPreviewComponent } from './flight-preview.component';

describe('FlightPreviewComponent', () => {
  let component: FlightPreviewComponent;
  let fixture: ComponentFixture<FlightPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlightPreviewComponent,
        TimePipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlightPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  // it('should create', () => {
  //   component.ngOnInit()
  //   expect(component).toBeTruthy();
  // });

  // it('flights should be an array', () => {
  //   component.ngOnInit()
  //   expect(component.flight).toBe([])
  // })
});
