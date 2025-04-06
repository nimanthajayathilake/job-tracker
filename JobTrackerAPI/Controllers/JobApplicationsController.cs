using JobTrackerAPI.Models;
using JobTrackerAPI.Repositories;
using Microsoft.AspNetCore.Mvc;

namespace JobTrackerAPI.Controllers
{
    [Route("api/JobApplications")]
    [ApiController]
    public class JobApplicationsController : ControllerBase
    {
        private readonly IJobApplicationRepository _repository;

        public JobApplicationsController(IJobApplicationRepository repository)
        {
            _repository = repository;
        }

        // GET /applications
        [HttpGet]
        public async Task<ActionResult<IEnumerable<JobApplication>>> GetApplications(int page = 1, int pageSize = 5)
        {
            if (page <= 0 || pageSize <= 0)
                return BadRequest("Page and pageSize must be greater than 0.");

            var totalRecords = await _repository.CountAsync();
            var applications = await _repository.GetPaginatedAsync(page, pageSize);

            var response = new
            {
                totalRecords,
                currentPage = page,
                pageSize,
                totalPages = (int)Math.Ceiling((double)totalRecords / pageSize),
                data = applications
            };

            return Ok(response);
        }


        // GET /applications/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<JobApplication>> GetApplication(int id)
        {
            var application = await _repository.GetApplicationByIdAsync(id);
            if (application == null)
                return NotFound();
            return Ok(application);
        }

        // POST /applications
        [HttpPost]
        public async Task<ActionResult<JobApplication>> CreateApplication(JobApplication application)
        {
            await _repository.AddApplicationAsync(application);
            return CreatedAtAction(nameof(GetApplication), new { id = application.Id }, application);
        }

        // PUT /applications/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateApplication(int id, JobApplication application)
        {
            if (id != application.Id)
                return BadRequest();
            await _repository.UpdateApplicationAsync(application);
            return NoContent();
        }

        // DELETE /applications/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteApplication(int id)
        {
            await _repository.DeleteApplicationAsync(id);
            return NoContent();
        }
    }
}
