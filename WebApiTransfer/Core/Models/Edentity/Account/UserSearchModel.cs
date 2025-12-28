namespace Core.Models.Edentity.Account;

public class UserSearchModel
{
    public string? Name { get; set; }
    public DateTime? StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public int Page { get; set; } = 1;
    public int ItemPerPage { get; set; } = 10;
}