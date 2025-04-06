# Job Application Tracker - Backend (ASP.NET Core Web API)

## Overview
This is the backend API for the Job Application Tracker, built with ASP.NET Core Web API. It handles job application data and supports CRUD operations with server-side pagination.

## Prerequisites
- .NET 9.0 SDK or higher
- SQLite

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/nimanthajayathilake/job-tracker.git
   cd job-tracker/JobTrackerAPI
   ```

2. **Install dependencies:**
   ```bash
   dotnet restore
   ```

3. **Apply migrations to create the SQLite database:**
   ```bash
   dotnet ef migrations add InitialCreate
   dotnet ef database update
   ```

4. **Run the application:**
   ```bash
   dotnet run
   ```
   The API will be available at: [https://localhost:44369](https://localhost:44369)

## API Endpoints

### Job Applications
- `GET /api/JobApplications?pageNumber=1&pageSize=10` - Get all job applications with pagination
- `GET /api/JobApplications/{id}` - Get a job application by ID
- `POST /api/JobApplications` - Create a new job application
- `PUT /api/JobApplications/{id}` - Update a job application
- `DELETE /api/JobApplications/{id}` - Delete a job application

## Swagger Documentation
The API uses Swagger UI for interactive documentation, available at:

[https://localhost:44369/index.html](https://localhost:44369/index.html)

## Assumptions
- SQLite is used as the database.
- CORS is handled to allow access from the Angular frontend.
- Server-side pagination is implemented.

---
