import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IdentityService } from '../../../services/identity.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private identityService: IdentityService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    // Initialize the form inside ngOnInit
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
