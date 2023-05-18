import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  Select2Data,
  Select2Option,
  Select2UpdateEvent,
} from 'ng-select2-component';

@Component({
  selector: 'app-optional-select',
  templateUrl: './optional-select.component.html',
  styleUrls: ['./optional-select.component.scss'],
})
export class OptionalSelectComponent implements OnInit {
  @Output() valueChanged = new EventEmitter<any>();
  @Output() otherChanged = new EventEmitter<boolean>();
  private _other: boolean;
  @Input()
  get other() {
    return this._other;
  }

  set other(value: boolean) {
    this._other = value;
    this.otherChanged.emit(this._other);
  }

  @Input() items: { value: string; label: string }[];
  @Input() placeholder: string;
  @Input() otherLabel: string;
  @Input() disabled: boolean;
  @Input() value: any;

  data: { value: string; label: string }[];

  constructor() {}

  ngOnInit() {}

  change(event: Event) {
    // this.otherOption = event == 'other';

    console.log(event, this.other);
  }

  search(text: string) {
    this.data = text
      ? (JSON.parse(JSON.stringify(this.data)) as Select2Option[]).filter(
          (option) =>
            option.label.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      : JSON.parse(JSON.stringify(this.data));
  }
  update(event: Select2UpdateEvent<any>) {
    this.other = event.value == 'other';
    this.valueChanged.emit(this.other ? null : event.value);
  }
}
