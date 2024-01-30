using System.Net.Http.Json;
using InventoryReporting.Models.ECommerce;

namespace InventoryReporting.ECommerce
{
    public class ECommerceService: IECommerceService
    {
        private readonly HttpClient _http;

        public ECommerceService(HttpClient http)
        {
            _http = http;
        }

        public async Task<SalesType[]> GetSales()
        {
            return await _http.GetFromJsonAsync<SalesType[]>("https://excel2json.io/api/share/f9942c71-b172-4060-4381-08da496bf5f2");
        }
    }
}