import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { combineLatest, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  statusLogIn = true;
  statusVisibility = false;
  passwordInputType: 'text' | 'password' = 'password';

  loginData = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  loading$ = this.authService.loading;
  errorMsg$ = this.authService.errorMsg;

  vm$ = combineLatest([this.loading$, this.errorMsg$]).pipe(
    map(([loading, errorMsg]) => ({ loading, errorMsg }))
  );

  constructor(
    private authService: AuthService,
    private fb: NonNullableFormBuilder
  ) {}

  get controls() {
    return this.loginData.controls;
  }

  updateVisibility(status: string) {
    this.statusVisibility = !this.statusVisibility;
    if (status == 'on') {
      this.passwordInputType = 'password';
    } else {
      this.passwordInputType = 'text';
    }
  }

  onSubmit() {
    const username = this.loginData.value.username;
    const password = this.loginData.value.password;
    if (username && password)
      this.authService.login({ username: username, password: password });
  }
}
