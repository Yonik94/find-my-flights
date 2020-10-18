import { Component, Input, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { FlightService } from '../../services/flight/flight.service';
@Component({
  selector: 'single-flight',
  templateUrl: './single-flight.component.html',
  styleUrls: ['./single-flight.component.scss']
})
export class SingleFlightComponent implements OnInit {
  flight: Object;
  isOpen: Boolean = false;
  connections: Object[]
  constructor(private flightService: FlightService, private route: ActivatedRoute, private router: Router) { }

  setConnectionsAppear(ev): void {
    this.isOpen = ev;
  }

  goBack() {
    this.router.navigate(['']);
  }
  
  ngOnInit(): void {
    let id: String;
    this.route.params.subscribe(param => id = param.id);
    this.flight = this.flightService.getFlight(id);
    if(!this.flight) this.router.navigate(['/']);
    else this.connections = this.flight['connections'];
  }

}
