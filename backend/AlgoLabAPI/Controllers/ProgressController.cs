using Microsoft.AspNetCore.Mvc;
using AlgoLabAPI.Models;

namespace AlgoLabAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProgressController : ControllerBase
    {
        // In a real application, this would be replaced with a database
        private static List<UserProgress> _progressRecords = new List<UserProgress>();

        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<UserProgress>> GetUserProgress(string userId)
        {
            var progress = _progressRecords.Where(p => p.UserId == userId);
            return Ok(progress);
        }

        [HttpGet("user/{userId}/module/{moduleId}")]
        public ActionResult<UserProgress> GetModuleProgress(string userId, int moduleId)
        {
            var progress = _progressRecords.FirstOrDefault(p => p.UserId == userId && p.ModuleId == moduleId);
            if (progress == null)
            {
                return NotFound();
            }
            return Ok(progress);
        }

        [HttpPost]
        public ActionResult<UserProgress> SaveProgress([FromBody] UserProgress progress)
        {
            var existingProgress = _progressRecords.FirstOrDefault(p => 
                p.UserId == progress.UserId && p.ModuleId == progress.ModuleId);

            if (existingProgress != null)
            {
                existingProgress.ProgressPercentage = progress.ProgressPercentage;
                existingProgress.IsCompleted = progress.IsCompleted;
                existingProgress.SavedBlocklyXml = progress.SavedBlocklyXml;
                existingProgress.LastAccessed = DateTime.Now;
                return Ok(existingProgress);
            }
            else
            {
                progress.Id = _progressRecords.Count > 0 ? _progressRecords.Max(p => p.Id) + 1 : 1;
                progress.LastAccessed = DateTime.Now;
                _progressRecords.Add(progress);
                return CreatedAtAction(nameof(GetModuleProgress), 
                    new { userId = progress.UserId, moduleId = progress.ModuleId }, progress);
            }
        }
    }
}
