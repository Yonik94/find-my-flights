// Component settings
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router'
//Services & Calsses

// Components
@Component({
  selector: 'flight-list',
  templateUrl: './flight-list.component.html',
  styleUrls: ['./flight-list.component.scss']
})
export class FlightListComponent implements OnInit {
  @Input() flights: Object
  constructor(private router : Router) { }

  onFlightClick(id: String): void {
    this.router.navigate([`/${id}`]);
  }

  ngOnInit(): void {
  }

}
