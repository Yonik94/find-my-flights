import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.scss']
})
export class SortComponent implements OnInit {
  @Output() sortFlights = new EventEmitter()
  constructor() { }
  sort: Object
  onSortFlights(): void {
    this.sortFlights.emit(this.sort)
  }
  ngOnInit(): void {
    
  }

}
