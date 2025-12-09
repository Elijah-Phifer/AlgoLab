namespace AlgoLabAPI.Models
{
    public class UserProgress
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int ModuleId { get; set; }
        public bool IsCompleted { get; set; }
        public int ProgressPercentage { get; set; }
        public DateTime LastAccessed { get; set; }
        public string? SavedBlocklyXml { get; set; }
    }
}
