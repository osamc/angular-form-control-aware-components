import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.scss']
})
export class Test2Component implements OnInit {

  form: FormGroup;
  debug: boolean = false;

  constructor(private fb: FormBuilder) {

    this.form = this.fb.group({
      password: new FormControl('', Validators.required),
      confPassword: new FormControl('', Validators.required)
    });

    this.form.setValidators(this.confirmPassword());

  }

  ngOnInit(): void {
  }

  confirmPassword(): ValidatorFn {

    return (control: AbstractControl) => {

      let group = control as FormGroup;

      let password = group.get('password');
      let confPassword = group.get('confPassword');
  
      let passwordErr: ValidationErrors | null = {};
      let confErr: ValidationErrors | null = {};
  
      if (password && confPassword) {
  
        passwordErr = password.errors || {};
        confErr = confPassword.errors || {};
  
        if (password.value !== confPassword.value) {
          passwordErr.confirm = "confirm";
          confErr.confirm = "confirm";
        } else {
          delete passwordErr.confirm;
          delete confErr.confirm;

        }
  
        password.setErrors(Object.keys(passwordErr).length > 0 ? passwordErr : null);
        confPassword.setErrors(Object.keys(confErr).length > 0 ? confErr : null);
  
      }

      return null;
    }

    
  }

  toggleDebug() {
    this.debug = !this.debug;
  }

}
