import { Component, OnInit } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, of, timer } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.scss']
})
export class Test3Component implements OnInit {

  form: FormGroup;
  loading: boolean = false;
  debug: boolean = false;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      async: new FormControl('', Validators.required)
    })

    this.form.get('async')?.setAsyncValidators(this.asyncTest());


  }

  ngOnInit(): void {
  }

  asyncTest(): AsyncValidatorFn {
    return (control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> => {

      let timeInterval = this.randomNumber(200,2000);
      this.loading = true;

      return timer(timeInterval).pipe(map(() => {
        this.loading = false;
        console.log('ok');
        return (Math.random() > 0.5) ? null : {async: true} 
        
      }));

    }
  }

  randomNumber(min: number, max:number ) {
    return Math.floor((Math.random() * max) + min);
  }

  toggleDebug() {
    this.debug = !this.debug;
  }



}
