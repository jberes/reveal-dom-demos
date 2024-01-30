using Microsoft.AspNetCore.Components.Web;
using Microsoft.AspNetCore.Components.WebAssembly.Hosting;
using InventoryReporting;
using InventoryReporting.InventoryApp;
using InventoryReporting.RevealServer2;
using InventoryReporting.ECommerce;
using IgniteUI.Blazor.Controls;

var builder = WebAssemblyHostBuilder.CreateDefault(args);
builder.RootComponents.Add<App>("#app");
builder.RootComponents.Add<HeadOutlet>("head::after");

builder.Services.AddScoped(sp => new HttpClient { BaseAddress = new Uri(builder.HostEnvironment.BaseAddress) });
builder.Services.AddScoped<IInventoryAppService, InventoryAppService>();
builder.Services.AddScoped<IRevealServer2Service, RevealServer2Service>();
builder.Services.AddScoped<IECommerceService, ECommerceService>();
RegisterIgniteUI(builder.Services);

await builder.Build().RunAsync();

void RegisterIgniteUI(IServiceCollection services)
{
    services.AddIgniteUIBlazor(
        typeof(IgbListModule),
        typeof(IgbAvatarModule),
        typeof(IgbCardModule),
        typeof(IgbButtonModule),
        typeof(IgbRippleModule),
        typeof(IgbIconButtonModule),
        typeof(IgbInputModule),
        typeof(IgbSelectModule),
        typeof(IgbComboModule),
        typeof(IgbCheckboxModule)
    );
}