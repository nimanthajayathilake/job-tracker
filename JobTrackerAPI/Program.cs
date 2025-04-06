using JobTrackerAPI.Data;
using JobTrackerAPI.Repositories;
using Microsoft.EntityFrameworkCore;

internal class Program
{
    private static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container
        builder.Services.AddControllers();

        // Add Swagger for API documentation
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();

        // Add DbContext using SQLite
        builder.Services.AddDbContext<JobTrackerContext>(options =>
            options.UseSqlite("Data Source=jobtracker.db"));

        // Add repository (DI)
        builder.Services.AddScoped<IJobApplicationRepository, JobApplicationRepository>();

        // Add CORS policy to allow Angular frontend to connect
        builder.Services.AddCors(options =>
        {
            options.AddPolicy("AllowAngularApp", builder =>
            {
                builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
            });
        });

        var app = builder.Build();

        // Use Swagger in development and staging
        if (app.Environment.IsDevelopment() || app.Environment.IsStaging())
        {
            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Job Tracker API V1");
                c.RoutePrefix = string.Empty; // Swagger at root
            });
        }

        // Use CORS
        app.UseCors("AllowAngularApp");

        app.UseHttpsRedirection();
        app.UseAuthorization();

        // Map controller endpoints
        app.MapControllers();

        app.Run();
    }
}
