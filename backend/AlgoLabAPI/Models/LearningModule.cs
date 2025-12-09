namespace AlgoLabAPI.Models
{
    public class LearningModule
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int DifficultyLevel { get; set; } // 1-5
        public string Content { get; set; } = string.Empty;
        public List<string> Topics { get; set; } = new List<string>();
        public DateTime CreatedDate { get; set; }
        public DateTime LastModified { get; set; }
        public bool HasBlocklyWorkspace { get; set; }
        public string? BlocklyXml { get; set; }
    }
}
