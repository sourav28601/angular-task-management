import { Component } from '@angular/core';
import { ApiService} from '../../../core/services/api/api.service';
import { RouterLink, RouterLinkActive,QueryParamsHandling } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { SidebarComponent } from "../layout/sidebar/sidebar.component";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-all-task',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,CommonModule,SidebarComponent],
  templateUrl: './all-task.component.html',
  styleUrl: './all-task.component.css'
})
export class AllTaskComponent {
  tasks:any;  
  currentPage: number = 1;
  totalCount: number = 0; 
  pageSize: number = 10; 
  totalPages: number = 0; 

  constructor(private apiService: ApiService) {
    this.getAllTasks();
  }

  getAllTasks() {
    this.apiService.getApi('task/all').subscribe({
      next: (response: any) => {
        this.tasks = response.data.tasks; // Assign the tasks array to tasks
        console.log('Fetched Tasks:', this.tasks);
      },
      error: (error: any) => {
        console.error('Error loading tasks:', error);
      }
    });
  }
  deleteTask(id: any): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.apiService.deleteTask(id).subscribe({
          next: () => {
            Swal.fire(
              'Deleted!',
              'The task has been deleted.',
              'success'
            );
            location.reload();
          },
          error: (error: any) => {
            console.error('Error deleting event:', error);
            Swal.fire(
              'Error!',
              'There was an error deleting the task. Please try again.',
              'error'
            );
          },
        });
      }
    });
  }
  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.getAllTasks(); 
    }
  }
}
