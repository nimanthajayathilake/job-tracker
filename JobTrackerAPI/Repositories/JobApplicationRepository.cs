using JobTrackerAPI.Data;
using JobTrackerAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace JobTrackerAPI.Repositories
{
    public class JobApplicationRepository : IJobApplicationRepository
    {
        private readonly JobTrackerContext _context;

        public JobApplicationRepository(JobTrackerContext context)
        {
            _context = context;
        }

        public async Task<List<JobApplication>> GetApplicationsAsync()
        {
            return await _context.JobApplications.ToListAsync();
        }

        public async Task<JobApplication> GetApplicationByIdAsync(int id)
        {
            return await _context.JobApplications.FindAsync(id);
        }

        public async Task AddApplicationAsync(JobApplication application)
        {
            _context.JobApplications.Add(application);
            await _context.SaveChangesAsync();
        }

        public async Task UpdateApplicationAsync(JobApplication application)
        {
            _context.Entry(application).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task DeleteApplicationAsync(int id)
        {
            var application = await _context.JobApplications.FindAsync(id);
            if (application != null)
            {
                _context.JobApplications.Remove(application);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<int> CountAsync()
        {
            return await _context.JobApplications.CountAsync();
        }

        public async Task<IEnumerable<JobApplication>> GetPaginatedAsync(int page, int pageSize)
        {
            int skip = (page - 1) * pageSize;
            return await _context.JobApplications
                                 .OrderByDescending(j => j.DateApplied)
                                 .Skip(skip)
                                 .Take(pageSize)
                                 .ToListAsync();
        }

    }
}
