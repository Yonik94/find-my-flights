import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {
  @Output() setDate = new EventEmitter()
  startDate: Date = new Date(Date.now());
  constructor() { }
  emitDate(ev): void {
    this.setDate.emit(ev);
  }
  ngOnInit(): void {
  }

}
