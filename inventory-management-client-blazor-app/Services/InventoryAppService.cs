using System.Net.Http.Json;
using InventoryReporting.Models.InventoryApp;

namespace InventoryReporting.InventoryApp
{
    public class InventoryAppService: IInventoryAppService
    {
        private readonly HttpClient _http;

        public InventoryAppService(HttpClient http)
        {
            _http = http;
        }

        public async Task<NewProductsType[]> GetNewProducts()
        {
            return await _http.GetFromJsonAsync<NewProductsType[]>("https://excel2json.io/api/share/4b54e7f8-927a-4a38-e690-08dab79fa5b4");
        }
    }
}