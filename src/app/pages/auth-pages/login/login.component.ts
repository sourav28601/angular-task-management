import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../core/services/api/api.service';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    console.log('Form submitted');
    console.log('Login Form Value:', this.loginForm.value);

    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      console.log('Form Data:', formData);
      this.apiService.login(formData).subscribe(
        {
          next:(response) => {
            console.log('response------', response);
            localStorage.setItem('user_data', JSON.stringify(response));
            this.loginForm.reset();
            Swal.fire({
              title: 'Login Successful',
              text: 'You have been logged in successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.router.navigate(['/create-task']);
            });
          },
          error: (error) => {
            console.log('error----', error);
            console.error('Login failed', error);
            Swal.fire({
              title: 'Login Failed',
              text:
                error.error.message || 'There was a problem with your login.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        }
      );
    } else {
      console.log('Form is invalid');
      Object.values(this.loginForm.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }
}
