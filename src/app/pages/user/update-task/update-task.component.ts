import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../../../core/services/api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-task',
  standalone: true,
  imports: [SidebarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent implements OnInit {
  d!: FormGroup;
  id!: string;
  taskStatuses = ['pending', 'in-progress', 'completed'];  // Example task statuses
  
  constructor(
    private router: Router,
    private activated: ActivatedRoute,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.d = new FormGroup({
      title: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required, Validators.minLength(10)]),
      status: new FormControl('', Validators.required),
    });

    this.id = this.activated.snapshot.paramMap.get('id') as string;
    this.fetchTaskData();
  }

  fetchTaskData(): void {
    this.apiService.editTask(this.id).subscribe(
      (res: any) => {
        console.log('Fetched Task Data: ', res); // Check the response here
        
        if (res && res.data) {
          const taskData = res.data;
  
          // Patch the form values with the data from API
          this.d.patchValue({
            title: taskData.title,
            description: taskData.description,
            status: taskData.status,
          });
  
          console.log('Form after patching: ', this.d.value); // Debugging step
        }
      },
      (error: any) => {
        console.error('Error fetching task data:', error);
        alert('Failed to load task data.');
      }
    );
  }
  

  edit(): void {
    if (this.d.invalid) {
      alert('Please fill all required fields correctly!');
      return;
    }

    const updatedData = this.d.value;

    this.apiService.updateTask(this.id, updatedData).subscribe(
      (res: any) => {
        console.log('Task updated successfully: ', res);
        Swal.fire({
          title: 'Success!',
          text: 'The task has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK',
        }).then(() => {
          this.router.navigate(['/all-task']);
        });
      },
      (error: any) => {
        console.error('Error updating task:', error);
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating the task. Please try again.',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      }
    );
  }
}

