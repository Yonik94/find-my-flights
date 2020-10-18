import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'flight-additional-details',
  templateUrl: './flight-additional-details.component.html',
  styleUrls: ['./flight-additional-details.component.scss']
})
export class FlightAdditionalDetailsComponent implements OnInit {
  @Input() flight;
  stations: String[];

  constructor() { }
  getConnections() {
    if(!this.flight.connections || !this.flight.connections.length) return;
    this.stations =  this.flight.connections.reduce((acc, flight, idx) => {
      if(idx > 0) acc.push(flight.origin);
      return acc;
    }, []);    
  }

  ngOnInit(): void {
    this.getConnections()
  }

}
