import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  @Input() text: String;
  @Output() closeModal = new EventEmitter();
  constructor() { }
  onCloseModal(): void {
    this.closeModal.emit();
  }
  ngOnInit(): void {    
  }

}
