/**
 * OIDC Callback Component
 * Handles the callback from OpenID Connect provider after authentication
 */

import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { TranslocoModule } from '@jsverse/transloco';
import { environment } from '../../../../environments/environment';

import { AuthService } from '../../../core/services/auth/auth.service';
import { AUTH_CONSTANTS } from '../../../shared/constants/app.constants';
import { AuthError } from '../../../shared/models/auth.models';

@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './callback.component.html',
  styles: [],
})
export class CallbackComponent implements OnInit {
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  // State signals
  private readonly _isProcessing = signal(true);
  private readonly _isSuccess = signal(false);
  private readonly _error = signal<AuthError | null>(null);

  // Public readonly signals
  isProcessing = this._isProcessing.asReadonly();
  isSuccess = this._isSuccess.asReadonly();
  error = this._error.asReadonly();

  // Show detailed error information in development
  showErrorDetails(): boolean {
    return !environment.production;
  }

  ngOnInit(): void {
    this.handleCallback();
  }

  /**
   * Handle the OIDC callback
   */
  private handleCallback(): void {
    this._isProcessing.set(true);
    this._error.set(null);

    this.authService
      .handleAuthCallback()
      .pipe(finalize(() => this._isProcessing.set(false)))
      .subscribe({
        next: (success) => {
          if (success) {
            this._isSuccess.set(true);
            // Navigation is handled in the auth service
            // Add a small delay to show success state
            setTimeout(() => {
              const returnUrl =
                this.authService.getReturnUrl() ||
                AUTH_CONSTANTS.ROUTES.AFTER_LOGIN;
              this.authService.clearReturnUrl();
              this.router.navigateByUrl(returnUrl);
            }, 1500);
          }
        },
        error: (error: AuthError) => {
          this._error.set(error);
          console.error('Auth callback error:', error);
        },
      });
  }

  /**
   * Retry authentication process
   */
  retry(): void {
    this._error.set(null);
    this._isProcessing.set(true);
    this.handleCallback();
  }

  /**
   * Navigate back to login page
   */
  backToLogin(): void {
    this.router.navigate([AUTH_CONSTANTS.ROUTES.LOGIN]);
  }

  /**
   * Retry authentication by redirecting to login
   */
  retryAuthentication(): void {
    this.backToLogin();
  }

  /**
   * Navigate to login page
   */
  goToLogin(): void {
    this.router.navigate([AUTH_CONSTANTS.ROUTES.LOGIN]);
  }
}
