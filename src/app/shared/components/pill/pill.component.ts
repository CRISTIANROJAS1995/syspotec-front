import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'hibeats-pill',
  templateUrl: './pill.component.html',
  styleUrls: ['./pill.component.scss'],
})
export class PillComponent {
  @Input() item: string;
  @Input() canRemove: boolean = true;
  @Output() removeItemEvent: EventEmitter<string> = new EventEmitter<string>();

  removeItem(item: string) {
    this.removeItemEvent.emit(item);
  }
}
