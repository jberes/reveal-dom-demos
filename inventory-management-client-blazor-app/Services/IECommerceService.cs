using InventoryReporting.Models.ECommerce;

namespace InventoryReporting.ECommerce
{
    public interface IECommerceService
    {
        Task<SalesType[]> GetSales();
    }
}