using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace MTSMonitoring
{
    public class Startup
    {
        public Startup(IConfiguration config)
        {
            Config = config;
        }

        // Получение настроек приложения из файла конфигурации appsettings.json
        public IConfiguration Config { get; set; }

        public void ConfigureServices(IServiceCollection services)
        {
            // Разрешаем подключение к сервису с других ip-адресов
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", build =>
            {
                build.SetIsOriginAllowed(host => true)
                    .WithOrigins("localhost:5001")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }));

            // Устанавливаем правила для использования cookies
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            // Подключаем модуль SignalR
            services.AddSignalR();

            // Получаем настройки для подключения к сервису MTSService из файла настроек
            services.Configure<MtsConnectionOptions>(Config.GetSection("Mts"));
            services.Configure<DBConnectionOptions>(Config.GetSection("PGSQL"));
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            var loggerFactory = LoggerFactory.Create(builder =>
            {
                builder.AddDebug();
            });
            ILogger logger = loggerFactory.CreateLogger<Startup>();

            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            app.UseCors("CorsPolicy");
            app.UseHttpsRedirection();
            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseRouting();
            
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<ARM1>("/ARM1");
                endpoints.MapHub<ARM2>("/ARM2");
            });
            logger.LogInformation("Запускаем приложение {0}", env.ContentRootPath + "\\" + env.ApplicationName);
        }
    }
}
