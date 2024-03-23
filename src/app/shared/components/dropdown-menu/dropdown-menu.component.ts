import { Component, EventEmitter, Input, OnInit, Output, Type } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HibeatResponseModelInstrumentInterest } from 'app/core/models/hibeat/hibeat-response-model';
@Component({
  selector: 'hibeats-dropdown-menu',
  templateUrl: './dropdown-menu.component.html',
  styleUrls: ['./dropdown-menu.component.scss'],
})
export class DropdownMenuComponent {
  @Input() options: string;;
  @Input() defaultText = '';
  @Input() type: string = '';
  @Input() option: string = '';
  @Input() optionSelects: any;

  @Output() optionChange: EventEmitter<string> = new EventEmitter<string>();

  //toppings = new FormControl('') ;
  toppings : HibeatResponseModelInstrumentInterest[] = [] ;

  selectOption(option: string) {
    this.optionSelects = this.toppings;
    // this.defaultText = option;
    // this.option = option;
    this.optionChange.emit(this.optionSelects);
  }
}
