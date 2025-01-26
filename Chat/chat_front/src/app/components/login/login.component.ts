import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, Form } from '@angular/forms';
import { IdentityService } from '../../services/identity.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  private loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onFormSubmit(): void {
    if (this.loginForm.valid) {
      const user = this.loginForm.value;
      this.identityService.login(user).subscribe(
        (res) => {
          this.router.navigate(['/']);
        },
        (err) => {
          console.error('Login failed', err);
        }
      );
    }
  }
}
