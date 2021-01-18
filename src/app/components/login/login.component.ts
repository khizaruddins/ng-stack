import { LoginService } from './login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MustMatch } from './../../helpers/validators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) { }

  loginForm: FormGroup;
  signupForm: FormGroup;
  showPassword: boolean = false;
  showSignupPassword: boolean = false;
  showSignupCPassword: boolean = false;
  signupError = null;

  ngOnInit(): void {
    this.initForm();
    this.initSignupErrorObs()
    if (localStorage.getItem('loginStatus') === 'true') {
      this.router.navigate(['/']);
    }
  }

  initSignupErrorObs() {
    this.loginService.authErrorObs$.subscribe(data => {
      this.signupError = data;
    })
  }

  togglePasswordVisibility(event: Event): void {
    this.showPassword = !this.showPassword;
  }

  initForm() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required,]],
      password: ['', [Validators.required]]
    });

    this.signupForm = this.fb.group({
      name: [null, [Validators.required]],
      mobno: [null,],
      email: [null, [Validators.required,]],
      password: [null, [Validators.required]],
      c_password: [null, [Validators.required,]],
    }, {
      validators: MustMatch('password', 'c_password')
    });
  }

  submitForm(event: Event, choice) {
    event.preventDefault();
    switch (choice) {
      case 'login':
        if (this.loginForm.valid) {
          const pass = btoa(this.loginForm.get('password').value)
          this.loginService.login(this.loginForm.get('email').value, pass);
          this.loginForm.markAsPristine();
          this.loginForm.markAsUntouched();
        }
        break;
      case 'signup':
        if (this.signupForm.valid) {
          this.loginService.createUserWithEmailAndPassword({
            ...this.signupForm.value,
            password: btoa(this.signupForm.get('password').value)
          })
          this.signupForm.markAsPristine();
          this.signupForm.markAsUntouched();
        }
        break;
    }
  }

}
