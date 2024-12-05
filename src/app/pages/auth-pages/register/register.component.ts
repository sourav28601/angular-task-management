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
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', Validators.required),
  });

  constructor(private apiService: ApiService, private router: Router) {}

  onSubmit() {
    console.log('Form submitted');
    console.log('Login Form Value:', this.registerForm.value);

    if (this.registerForm.valid) {
      const formData = this.registerForm.value;
      console.log('Form Data:', formData);
      this.apiService.register(formData).subscribe(
        {
          next:(response) => {
            console.log('response------', response);
            localStorage.setItem('user_data', JSON.stringify(response));
            this.registerForm.reset();
            Swal.fire({
              title: 'Register Successful',
              text: 'You have been register successfully!',
              icon: 'success',
              confirmButtonText: 'OK',
            }).then(() => {
              this.router.navigate(['/create-task']);
            });
          },
          error: (error) => {
            console.log('error----', error);
            console.error('Register failed', error);
            Swal.fire({
              title: 'Register Failed',
              text:
                error.error.message || 'There was a problem with your register.',
              icon: 'error',
              confirmButtonText: 'OK',
            });
          },
        }
      );
    } else {
      console.log('Form is invalid');
      Object.values(this.registerForm.controls).forEach((control) =>
        control.markAsTouched()
      );
    }
  }
}
