using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Data
{
    public class JobTrackerContext : DbContext
    {
        public JobTrackerContext(DbContextOptions<JobTrackerContext> options) : base(options)
        { }

        public DbSet<JobApplication> JobApplications { get; set; }
    }
}
