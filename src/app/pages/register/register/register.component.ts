import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  NonNullableFormBuilder,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  statusLogIn = true;
  statusPasswordVisibility = false;
  statusConfirmVisibility = false;
  passwordInputType: 'text' | 'password' = 'password';
  confirmInputType: 'text' | 'password' = 'password';
  statusSuccesse = false;
  checkUserRegistered = false;

  registerForm = this.fb.group({
    username: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(18),
        Validators.pattern(/^[A-z]/),
      ],
    ],
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(18),
        Validators.pattern(/[A-z]/),
      ],
    ],
    lastName: [
      '',
      [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(18),
        Validators.pattern(/^[A-z]/),
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.maxLength(22), Validators.email],
    ],
    password: [
      '',
      [Validators.required, Validators.maxLength(18), Validators.minLength(8)],
    ],
    confirm: [''],
    positions: this.fb.array([this.fb.control('')]),
  });

  constructor(
    private fb: NonNullableFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.controls['confirm'].setValidators(
      this.confirmPasswordValidator(this.controls['password'])
    );
  }

  get controls() {
    return this.registerForm.controls;
  }

  updateVisibility(status: string, which: string) {
    if (which == 'passwordInpurt') {
      this.statusPasswordVisibility = !this.statusPasswordVisibility;
      if (status == 'on') {
        this.passwordInputType = 'password';
      } else {
        this.passwordInputType = 'text';
      }
    } else if (which == 'confirmInpurt') {
      this.statusConfirmVisibility = !this.statusConfirmVisibility;
      if (status == 'on') {
        this.confirmInputType = 'password';
      } else {
        this.confirmInputType = 'text';
      }
    }
  }

  get positions() {
    return this.registerForm.controls['positions'];
  }

  Register() {
    console.log(this.registerForm.value.username);
    this.authService.checkUser().subscribe((response) => {
      if (
        response.users.filter(
          (u: any) => u.username == this.registerForm.value.username
        ).length == 0
      ) {
        this.statusSuccesse = true;
        this.registerForm.reset();
        this.checkUserRegistered = false;
      } else {
        this.checkUserRegistered = true;
      }
    });
  }

  registerSuccesse() {
    this.statusSuccesse = false;
    this.router.navigate(['/login']);
  }

  confirmPasswordValidator(compareTo: AbstractControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return { required: 'Please confirm password!' };
      }
      if (control.value && control.value !== compareTo.value) {
        return { confirm: 'The passwords do not match!' };
      }
      return null;
    };
  }
}
