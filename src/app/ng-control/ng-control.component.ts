import { Component, forwardRef, Input, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'ng-control',
  templateUrl: './ng-control.component.html',
  styleUrls: ['./ng-control.component.scss']
})
export class NgControlComponent implements ControlValueAccessor, OnInit {

  @Input()
  debug: boolean = false;

  value: string = '';
  invalid: boolean = false;
  errors: any = '';

  onChange: Function | undefined;
  onTouch: Function | undefined;

  constructor(@Optional() @Self() public ngControl: NgControl) { 
    ngControl.valueAccessor = this;
  }

  ngOnInit(): void {

    this.invalid = this.ngControl.errors != null;
    this.errors = this.ngControl.errors;

    if (this.ngControl) {
      this.ngControl.statusChanges?.subscribe(res => {
        this.invalid = this.ngControl.errors != null;
        this.errors = this.ngControl.errors;
      })
    }
  }

  writeValue(obj: any): void {
    if (this.onChange) {
      this.onChange(obj);
    }
    
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  onBlur() {
    if (this.onTouch) {
      this.onTouch();
    }
  }

}
