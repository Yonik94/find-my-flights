import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlightService } from '../../services/flight/flight.service';
import { FormGroup, FormControl } from '@angular/forms';
@Component({
  selector: 'filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Output() setFilter = new EventEmitter()
  @Input() origins: String[]
  @Input() destinations: String[]
  constructor(private flightService: FlightService) { }
  connections: Number[]
  filter = {
    origin: "",
    destination: "",
    connections: null,
    minPrice: -Infinity,
    maxPrice: Infinity,
    startDate: null,
    endDate: null
  }
  errorText: String = null;
  filterFlights(ev): void {
    ev.preventDefault();
    // setTimeout(() => { this.errorText = null }, 3000);
    if (this.filter.origin && !this.filter.destination
      || !this.filter.origin && this.filter.destination) {
      this.errorText = 'Choose origin & destination';
      return;
    }
    if (this.filter.startDate && !this.filter.endDate
      || !this.filter.startDate && this.filter.endDate) {
      if (this.filter.startDate > this.filter.endDate
        || this.filter.startDate < Date.now()) {
        this.errorText = 'Invalid start or end date';
        return;
      }
      this.errorText = 'Choose start & end date';
      return;
    }
    this.setFilter.emit(this.filter);
  }

  setStartDate(ev): void {
    this.filter.startDate = Date.parse(ev.value);
  }

  setEndDate(ev): void {
    this.filter.endDate = Date.parse(ev.value);
  }

  closeModal(): void {
    this.errorText = null;
  }
  ngOnInit(): void {
  }

}
