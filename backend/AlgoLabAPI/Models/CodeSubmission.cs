namespace AlgoLabAPI.Models
{
    public class CodeSubmission
    {
        public int Id { get; set; }
        public string UserId { get; set; } = string.Empty;
        public int ModuleId { get; set; }
        public string BlocklyXml { get; set; } = string.Empty;
        public string GeneratedCode { get; set; } = string.Empty;
        public DateTime SubmittedDate { get; set; }
        public bool IsSuccessful { get; set; }
        public string? FeedbackMessage { get; set; }
    }
}
