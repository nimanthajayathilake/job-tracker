import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface JobApplication {
  id: number;
  companyName: string;
  position: string;
  status: string;
  dateApplied: string;
}

@Injectable({
  providedIn: 'root'
})
export class JobApplicationService {
  private apiUrl = 'httpS://localhost:44369/api/JobApplications'; // API URL

  constructor(private http: HttpClient) {}

  // Get paginated applications
  getApplications(page: number = 1, pageSize: number = 5): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
  }  

  // Add a new application
  addApplication(application: JobApplication): Observable<JobApplication> {
    return this.http.post<JobApplication>(this.apiUrl, application);
  }

  // Update an application
  updateApplication(id: number, application: JobApplication): Observable<JobApplication> {
    return this.http.put<JobApplication>(`${this.apiUrl}/${id}`, application);
  }

  // delete an application
  deleteApplication(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  
  
}
