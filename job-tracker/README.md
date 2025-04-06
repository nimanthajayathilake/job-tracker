# Job Application Tracker - Frontend (Angular)

## Overview
This is the frontend for the Job Application Tracker, built with Angular 19. It allows users to view, add, and update job applications with server-side pagination.

## Prerequisites
- Node.js (v19 or higher)
- Angular CLI (Install via `npm install -g @angular/cli`)

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nimanthajayathilake/job-tracker.git
   cd job-tracker/job-tracker-client
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the application:**
   ```bash
   ng serve
   ```
   The frontend will be available at: [http://localhost:4200](http://localhost:4200)

## Assumptions
- The frontend communicates with the backend API hosted at [https://localhost:44369](https://localhost:44369).
- Angular HttpClient is used for API communication.
- Server-side pagination is implemented for efficient data loading.

## Features
- **Job Application List:** View all job applications in a paginated table.
- **Add Application:** Add new job application entries.
- **Update Status:** Change the status of job applications (e.g., Interview, Offer, Rejected).
- **Responsive Design:** Clean UI with basic styling using separate HTML and CSS files.

## Folder Structure
- `job-tracker-client/` - Angular frontend
- `JobTrackerAPI/` - .NET Core Web API backend

## Notes
- Ensure both backend and frontend are running simultaneously for full functionality.
- For production, update CORS settings and API URLs accordingly.