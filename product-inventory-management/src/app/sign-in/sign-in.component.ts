import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class SignInComponent {
  loginForm: FormGroup;
  submitted = false;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    console.log('Logging in:', this.loginForm.value); 

    this.authService.loginUser(this.loginForm.value.email, this.loginForm.value.password).subscribe({
      next: (response) => {
        console.log('Login successful:', response);
        alert('Login successful! Redirecting to Products.');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Login failed:', err);
        this.errorMessage = 'Invalid credentials!';
      }
    });
  }
}
