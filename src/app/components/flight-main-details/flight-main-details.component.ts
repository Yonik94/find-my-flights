import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flight-main-details',
  templateUrl: './flight-main-details.component.html',
  styleUrls: ['./flight-main-details.component.scss']
})
export class FlightMainDetailsComponent implements OnInit {
  @Input() timestamp: Date;
  @Input() place: String;
  constructor() { }

  ngOnInit(): void {
  }

}
