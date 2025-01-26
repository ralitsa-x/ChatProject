import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IdentityService } from '../../../services/identity.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  imports: [ReactiveFormsModule]
})
export class RegisterComponent {
  protected registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onFormSubmit(): void {
    if (this.registerForm.valid) {
      const user = this.registerForm.value;
      this.identityService.register(user).subscribe(
        () => {
          this.router.navigate(['/login']);
        },
        (err) => {
          console.error('Registration failed', err);
        }
      );
    }
  }
}
