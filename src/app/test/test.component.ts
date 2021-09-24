import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  form: FormGroup;
  model: string = "";

  debug: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      ngControl: new FormControl('', [Validators.required]),
      accessor: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    this.form.get('ngControl')?.valueChanges.subscribe(res => {
      if (res != 'sam') {
        this.form.get('ngControl')?.setErrors({ 'not Sam': true });
      }
    })

    this.form.get('accessor')?.valueChanges.subscribe(res => {
      if (res != 'sam') {
        this.form.get('accessor')?.setErrors({ 'not Sam': true });
      }
    })

  }

  setError() {
    if (this.form.get('ngControl')?.errors) {
      this.form.get('ngControl')?.setErrors(null);
      this.form.get('accessor')?.setErrors(null);
    } else {
      this.form.get('ngControl')?.setErrors({ 'manual': true });
      this.form.get('accessor')?.setErrors({ 'manual': true });
    }

  }

  toggleDebug() {
    this.debug = !this.debug;
  }

}
