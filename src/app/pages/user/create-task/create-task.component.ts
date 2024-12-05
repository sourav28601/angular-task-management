import { Component, OnInit } from '@angular/core';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api/api.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-create-task',
  standalone: true,
  imports: [SidebarComponent,ReactiveFormsModule,CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css'
})
export class CreateTaskComponent implements OnInit {
  data!: FormGroup;
  taskStatuses = ['pending', 'in-progress', 'completed'];

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.data = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      status: new FormControl('', Validators.required),
    });
  }

  addTask() {
    if (this.data.invalid) {
      return;
    }

    const formData = {
      title: this.data.get('title')?.value,
      description: this.data.get('description')?.value,
      status: this.data.get('status')?.value,
    };

    this.apiService.addTask(formData).subscribe(
      (res) => {
        this.data.reset();
        console.log(res);

        Swal.fire({
          title: 'Success!',
          text: 'Your task has been created successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        });
      },
      (error) => {
        Swal.fire({
          title: 'Error!',
          text: 'There was an error creating your task. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}

