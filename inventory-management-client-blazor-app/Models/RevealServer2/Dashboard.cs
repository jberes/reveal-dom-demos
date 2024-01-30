namespace InventoryReporting.Models.RevealServer2;

public class Dashboard
{
    public string Name { get; set; }
    public string DateCreated { get; set; }
    public string DateModified { get; set; }
    public string FakeOwner { get; set; }
    public string FakeOwnerImageUrl { get; set; }
    public Dictionary<string, object> ThumbnailInfo { get; set; }
}
