import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'accessor',
  templateUrl: './accessor.component.html',
  styleUrls: ['./accessor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccessorComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AccessorComponent),
      multi: true
    }
  ]
})
export class AccessorComponent implements ControlValueAccessor {

  @Input()
  debug: boolean = false;

  value: string = '';

  onValueChange: Function | undefined;
  onTouched: Function | undefined;

  invalid: boolean = false;
  errors: any;

  constructor() { }

  writeValue(obj: any): void {
    if (this.onValueChange) {
      this.onValueChange(obj);
    }
  }

  registerOnChange(fn: any): void {
    this.onValueChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onBlur() {
    if (this.onTouched) {
      this.onTouched();
    }
  }

  validate(control: FormControl) {
    console.log('validate', control)
    this.errors = control.errors;
    this.invalid = this.errors != null
  }



}
