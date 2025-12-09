using Microsoft.AspNetCore.Mvc;
using AlgoLabAPI.Models;

namespace AlgoLabAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ModulesController : ControllerBase
    {
        // In a real application, this would be replaced with a database
        private static List<LearningModule> _modules = new List<LearningModule>
        {
            new LearningModule
            {
                Id = 1,
                Title = "Introduction to Algorithms",
                Description = "Learn the basics of algorithms and problem-solving",
                Category = "Fundamentals",
                DifficultyLevel = 1,
                Content = "This module introduces you to the fundamental concepts of algorithms...",
                Topics = new List<string> { "Variables", "Loops", "Conditions" },
                CreatedDate = DateTime.Now.AddDays(-30),
                LastModified = DateTime.Now.AddDays(-10),
                HasBlocklyWorkspace = true,
                BlocklyXml = null
            },
            new LearningModule
            {
                Id = 2,
                Title = "Sorting Algorithms",
                Description = "Explore different sorting techniques",
                Category = "Algorithms",
                DifficultyLevel = 2,
                Content = "Learn about bubble sort, insertion sort, and merge sort...",
                Topics = new List<string> { "Bubble Sort", "Insertion Sort", "Merge Sort" },
                CreatedDate = DateTime.Now.AddDays(-25),
                LastModified = DateTime.Now.AddDays(-5),
                HasBlocklyWorkspace = true,
                BlocklyXml = null
            },
            new LearningModule
            {
                Id = 3,
                Title = "Data Structures",
                Description = "Understanding arrays, lists, and trees",
                Category = "Data Structures",
                DifficultyLevel = 3,
                Content = "Deep dive into essential data structures...",
                Topics = new List<string> { "Arrays", "Linked Lists", "Binary Trees" },
                CreatedDate = DateTime.Now.AddDays(-20),
                LastModified = DateTime.Now.AddDays(-2),
                HasBlocklyWorkspace = true,
                BlocklyXml = null
            }
        };

        [HttpGet]
        public ActionResult<IEnumerable<LearningModule>> GetAllModules()
        {
            return Ok(_modules);
        }

        [HttpGet("{id}")]
        public ActionResult<LearningModule> GetModule(int id)
        {
            var module = _modules.FirstOrDefault(m => m.Id == id);
            if (module == null)
            {
                return NotFound();
            }
            return Ok(module);
        }

        [HttpGet("category/{category}")]
        public ActionResult<IEnumerable<LearningModule>> GetModulesByCategory(string category)
        {
            var modules = _modules.Where(m => m.Category.Equals(category, StringComparison.OrdinalIgnoreCase));
            return Ok(modules);
        }

        [HttpPost]
        public ActionResult<LearningModule> CreateModule([FromBody] LearningModule module)
        {
            module.Id = _modules.Max(m => m.Id) + 1;
            module.CreatedDate = DateTime.Now;
            module.LastModified = DateTime.Now;
            _modules.Add(module);
            return CreatedAtAction(nameof(GetModule), new { id = module.Id }, module);
        }

        [HttpPut("{id}")]
        public ActionResult UpdateModule(int id, [FromBody] LearningModule module)
        {
            var existingModule = _modules.FirstOrDefault(m => m.Id == id);
            if (existingModule == null)
            {
                return NotFound();
            }

            existingModule.Title = module.Title;
            existingModule.Description = module.Description;
            existingModule.Category = module.Category;
            existingModule.DifficultyLevel = module.DifficultyLevel;
            existingModule.Content = module.Content;
            existingModule.Topics = module.Topics;
            existingModule.HasBlocklyWorkspace = module.HasBlocklyWorkspace;
            existingModule.BlocklyXml = module.BlocklyXml;
            existingModule.LastModified = DateTime.Now;

            return NoContent();
        }

        [HttpDelete("{id}")]
        public ActionResult DeleteModule(int id)
        {
            var module = _modules.FirstOrDefault(m => m.Id == id);
            if (module == null)
            {
                return NotFound();
            }

            _modules.Remove(module);
            return NoContent();
        }
    }
}
