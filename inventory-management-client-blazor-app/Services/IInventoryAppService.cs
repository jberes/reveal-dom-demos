using InventoryReporting.Models.InventoryApp;

namespace InventoryReporting.InventoryApp
{
    public interface IInventoryAppService
    {
        Task<NewProductsType[]> GetNewProducts();
    }
}