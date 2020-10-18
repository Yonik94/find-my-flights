import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'flight-preview',
  templateUrl: './flight-preview.component.html',
  styleUrls: ['./flight-preview.component.scss']
})
export class FlightPreviewComponent implements OnInit {
  @Input() flight
  @Output() setOpenConnections = new EventEmitter()
  constructor(private route: ActivatedRoute) { }
  stations: String[];
  isOpen: Boolean = false;
  getConnections() {
    if(!this.flight.connections || !this.flight.connections.length) return;
    this.stations =  this.flight.connections.reduce((acc, flight, idx) => {
      if(idx > 0) acc.push(flight.origin);
      return acc;
    }, []);    
  }
  isOnSingle(): Boolean {
    let isRouteParam: Boolean;
    if(this.route.params.subscribe(param => {
      if(param.id && this.flight.connections && this.flight.connections.length) isRouteParam = true;
    }))
    return isRouteParam;
  }

  onArrowClick(): void {
    this.isOpen = !this.isOpen;
    this.setOpenConnections.emit(this.isOpen);
  }

  ngOnInit(): void {
    this.getConnections()
  }

}