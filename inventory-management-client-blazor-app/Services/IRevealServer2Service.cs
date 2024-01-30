using InventoryReporting.Models.RevealServer2;

namespace InventoryReporting.RevealServer2
{
    public interface IRevealServer2Service
    {
        Task<Dashboard[]> GetDashboards(int mode);
    }
}