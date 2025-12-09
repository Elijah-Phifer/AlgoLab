using Microsoft.AspNetCore.Mvc;
using AlgoLabAPI.Models;

namespace AlgoLabAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SandboxController : ControllerBase
    {
        // In a real application, this would be replaced with a database
        private static List<CodeSubmission> _submissions = new List<CodeSubmission>();

        [HttpPost("submit")]
        public ActionResult<CodeSubmission> SubmitCode([FromBody] CodeSubmission submission)
        {
            submission.Id = _submissions.Count > 0 ? _submissions.Max(s => s.Id) + 1 : 1;
            submission.SubmittedDate = DateTime.Now;
            
            // Simple validation - in a real app, this would execute and validate the code
            submission.IsSuccessful = !string.IsNullOrEmpty(submission.BlocklyXml);
            submission.FeedbackMessage = submission.IsSuccessful 
                ? "Code submitted successfully!" 
                : "Invalid code submission.";

            _submissions.Add(submission);
            return Ok(submission);
        }

        [HttpGet("user/{userId}")]
        public ActionResult<IEnumerable<CodeSubmission>> GetUserSubmissions(string userId)
        {
            var submissions = _submissions.Where(s => s.UserId == userId)
                .OrderByDescending(s => s.SubmittedDate);
            return Ok(submissions);
        }

        [HttpGet("{id}")]
        public ActionResult<CodeSubmission> GetSubmission(int id)
        {
            var submission = _submissions.FirstOrDefault(s => s.Id == id);
            if (submission == null)
            {
                return NotFound();
            }
            return Ok(submission);
        }
    }
}
