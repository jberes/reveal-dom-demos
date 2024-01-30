using System.Net.Http.Json;
using InventoryReporting.Models.RevealServer2;

namespace InventoryReporting.RevealServer2
{
    public class RevealServer2Service: IRevealServer2Service
    {
        private readonly HttpClient _http;
        //private string _url_prod = "https://reveal-api.azurewebsites.net/";
        private string _url_dev = "http://localhost:5111/";

        public RevealServer2Service(HttpClient http)
        {
            _http = http;
        }

        public async Task<Dashboard[]> GetDashboards(int mode)
        {
            return await _http.GetFromJsonAsync<Dashboard[]>($"{_url_dev}dashboards?mode=" + mode);
        }
    }
}