import { Component, OnInit } from '@angular/core';
import { JobApplication, JobApplicationService } from '../../services/job-application.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];
  newApplication: JobApplication = this.initializeNewApplication();

  editing: boolean = false;
  editingId: number | null = null;

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalRecords = 0;

  constructor(private jobService: JobApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  initializeNewApplication(): JobApplication {
    return {
      id: 0,
      companyName: '',
      position: '',
      status: 'Applied',
      dateApplied: new Date().toISOString().split('T')[0],
    };
  }

  loadApplications(page: number = 1): void {
    this.currentPage = page;
    this.jobService.getApplications(page, this.pageSize).subscribe(response => {
      this.applications = response.data;
      this.totalRecords = response.totalRecords;
      this.totalPages = response.totalPages;
    });
  }

  addOrUpdateApplication(): void {
    if (this.editing && this.editingId !== null) {
      // Update logic
      this.jobService.updateApplication(this.editingId, this.newApplication).subscribe({
        next: () => {
          this.loadApplications();
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Application Updated',
            text: 'The job application was successfully updated.',
          });
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Update Failed',
            text: 'Something went wrong while updating the application.',
          });
          console.error('Update failed', err);
        }
      });
    } else {
      // Add logic
      this.jobService.addApplication(this.newApplication).subscribe({
        next: () => {
          this.loadApplications();
          this.resetForm();
          Swal.fire({
            icon: 'success',
            title: 'Application Added',
            text: 'The job application was successfully added.',
          });
        },
        error: err => {
          Swal.fire({
            icon: 'error',
            title: 'Add Failed',
            text: 'Something went wrong while adding the application.',
          });
          console.error('Add failed', err);
        }
      });
    }
  }

  editApplication(application: JobApplication): void {
    this.editing = true;
    this.editingId = application.id;

    // Format the date correctly for the date input field
    const formattedDate = application.dateApplied.split('T')[0]; // Extract 'yyyy-MM-dd'
    
    // Clone the application data with the formatted date
    this.newApplication = { ...application, dateApplied: formattedDate };
  }

  resetForm(): void {
    this.newApplication = this.initializeNewApplication();
    this.editing = false;
    this.editingId = null;
  }

  updateStatus(application: JobApplication, newStatus: string): void {
    const updatedApp = { ...application, status: newStatus };
    this.jobService.updateApplication(application.id, updatedApp).subscribe(() => {
      this.loadApplications();
      Swal.fire({
        icon: 'success',
        title: 'Status Updated',
        text: 'The job application status was successfully updated.',
      });
    }, (err) => {
      Swal.fire({
        icon: 'error',
        title: 'Update Failed',
        text: 'Something went wrong while updating the status.',
      });
      console.error('Status update failed', err);
    });
  }

  deleteApplication(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.jobService.deleteApplication(id).subscribe({
          next: () => {
            this.loadApplications();
            Swal.fire({
              icon: 'success',
              title: 'Application Deleted',
              text: 'The job application was successfully deleted.',
            });
          },
          error: err => {
            Swal.fire({
              icon: 'error',
              title: 'Delete Failed',
              text: 'Something went wrong while deleting the application.',
            });
            console.error('Delete failed', err);
          }
        });
      }
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadApplications(page);
    }
  }
}
