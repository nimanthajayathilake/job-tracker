import { Component, OnInit } from '@angular/core';
import { JobApplication, JobApplicationService } from '../../services/job-application.service';

@Component({
  selector: 'app-job-applications',
  standalone: false,
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.css']
})
export class JobApplicationsComponent implements OnInit {
  applications: JobApplication[] = [];
  newApplication: JobApplication = {
    id: 0,
    companyName: '',
    position: '',
    status: 'Applied',
    dateApplied: new Date().toISOString().split('T')[0],
  };

  currentPage = 1;
  pageSize = 5;
  totalPages = 0;
  totalRecords = 0;

  constructor(private jobService: JobApplicationService) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(page: number = 1): void {
    this.currentPage = page;
    this.jobService.getApplications(page, this.pageSize).subscribe(response => {
      this.applications = response.data;
      this.totalRecords = response.totalRecords;
      this.totalPages = response.totalPages;
    });
  }

  // Fetch all job applications
  getApplications(): void {
    this.jobService.getApplications().subscribe((data) => {
      this.applications = data;
    });
  }

  // Add a new job application
  addApplication(): void {
    this.jobService.addApplication(this.newApplication).subscribe((data) => {
      this.applications.push(data);
      this.newApplication = { id: 0, companyName: '', position: '', status: 'Applied', dateApplied: new Date().toISOString().split('T')[0] }; // Reset form
    });
  }

  // Update the status of an application
  updateStatus(application: JobApplication, newStatus: string): void {
    const updatedApp = { ...application, status: newStatus };
    this.jobService.updateApplication(application.id, updatedApp).subscribe(() => {
      this.getApplications();
    });
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadApplications(page);
    }
  }
}
