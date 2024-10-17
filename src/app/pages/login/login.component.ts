import { Component, inject } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MyErrorStateMatcher } from '../../core/helpers/form-error-state-handler';
import { Store } from '@ngrx/store';
import { selectAuthError, selectIsAuthenticated, selectAuthLoading } from '../../store/selectors/auth.selectors';
import { AuthActions } from '../../store/actions/auth.actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    SharedModule
  ],

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  loginForm: FormGroup;
  matcher: ErrorStateMatcher = new MyErrorStateMatcher();
  username = '';
  password = '';
  error$;
  isAuthenticated$;
  loading$;

  store = inject(Store)
  hide = true;

  constructor() {
    this.loginForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/) // Using Regex to validate email form field
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });

    this.error$ = this.store.select(selectAuthError);
    this.isAuthenticated$ = this.store.select(selectIsAuthenticated);
    this.loading$ = this.store.select(selectAuthLoading)
  }

  togglePasswordVisibility() {
    this.hide = !this.hide;
  }

  get emailFormControl():FormControl {
    return this.loginForm.get('email') as FormControl;
  }

  get passwordFormControl() {
    return this.loginForm.get('password') as FormControl;
  }
  submitForm(){
    this.store.dispatch(AuthActions.login(this.loginForm.value));
  }


}
