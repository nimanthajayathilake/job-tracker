using JobTrackerAPI.Models;

namespace JobTrackerAPI.Repositories
{
    public interface IJobApplicationRepository
    {
        Task<List<JobApplication>> GetApplicationsAsync();
        Task<JobApplication> GetApplicationByIdAsync(int id);
        Task AddApplicationAsync(JobApplication application);
        Task UpdateApplicationAsync(JobApplication application);
        Task DeleteApplicationAsync(int id);
        Task<int> CountAsync();
        Task<IEnumerable<JobApplication>> GetPaginatedAsync(int page, int pageSize);

    }
}
