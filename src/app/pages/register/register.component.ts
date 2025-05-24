import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  age: number | null = null;
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    if (this.age === null || this.age <= 0) {
      this.error = 'Please enter a valid age.';
      return;
    }
    this.authService
      .register(this.name, this.email, this.password, this.age)
      .subscribe({
        next: () => this.router.navigate(['/shows']),
        error: (err) =>
          (this.error = err.error.message || 'Registration failed'),
      });
  }
}
