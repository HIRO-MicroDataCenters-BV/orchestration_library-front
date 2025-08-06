import { Component, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { TranslocoModule } from '@jsverse/transloco';

import { AuthService } from '../../../core/services/auth/auth.service';
import { MockAuthService } from '../../../mock/auth.mock';
import { AUTH_CONSTANTS } from '../../../shared/constants/app.constants';
import {
  LoginCredentials,
  AuthError,
  AuthErrorType,
} from '../../../shared/models/auth.models';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslocoModule],
  templateUrl: './login.component.html',
  styleUrls: [],
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly mockAuthService = inject(MockAuthService);
  private readonly http = inject(HttpClient);

  private readonly _isLoading = signal(false);
  private readonly _error = signal<AuthError | null>(null);

  loginForm: FormGroup;

  isLoading = this._isLoading.asReadonly();
  error = this._error.asReadonly();

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });

    if (this.mockAuthService.isMockAuthEnabled()) {
      this.loginForm.patchValue({
        email: 'admin@admin.com',
        password: 'password',
      });
    }
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      this.markAllFieldsAsTouched();
      return;
    }

    this._isLoading.set(true);
    this._error.set(null);

    const credentials: LoginCredentials = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    // Проверяем, совпадают ли credentials с mock данными
    const isMockCredentials =
      credentials.email === 'admin@admin.com' &&
      credentials.password === 'password';

    console.log('=== Login Flow Decision ===');
    console.log('Is mock credentials?', isMockCredentials);
    console.log('Form values:', {
      email: credentials.email,
      password: '[HIDDEN]',
    });

    if (isMockCredentials) {
      console.log('Using MOCK authentication flow');
      // Используем mock аутентификацию
      this.authService
        .login(credentials)
        .pipe(finalize(() => this._isLoading.set(false)))
        .subscribe({
          next: (response) => {
            console.log('Mock login response:', response);
            if (response.success) {
              const returnUrl =
                this.authService.getReturnUrl() ||
                AUTH_CONSTANTS.ROUTES.AFTER_LOGIN;
              this.authService.clearReturnUrl();
              this.router.navigateByUrl(returnUrl);
            }
          },
          error: (error: AuthError) => {
            console.error('Mock login error:', error);
            this._error.set(error);
          },
        });
    } else {
      console.log('Using OIDC authentication flow with credentials');
      // Use OIDC authentication with real credentials
      this.authService
        .login(credentials)
        .pipe(finalize(() => this._isLoading.set(false)))
        .subscribe({
          next: (response) => {
            console.log('OIDC login response:', response);
            if (response.success) {
              const returnUrl =
                this.authService.getReturnUrl() ||
                AUTH_CONSTANTS.ROUTES.AFTER_LOGIN;
              this.authService.clearReturnUrl();
              this.router.navigateByUrl(returnUrl);
            }
          },
          error: (error: AuthError) => {
            console.error('OIDC login error:', error);
            this._error.set(error);
          },
        });
    }
  }

  private markAllFieldsAsTouched(): void {
    Object.keys(this.loginForm.controls).forEach((key) => {
      this.loginForm.get(key)?.markAsTouched();
    });
  }
}
