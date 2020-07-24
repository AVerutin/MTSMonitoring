// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Newtonsoft.Json;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Configuration;

namespace MTSMonitoring
{
    public class Startup
    {
        // Получение настроек приложения из файла конфигурации appsettings.json
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            // Подключаем класс настроек приложения
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // Разрешаем подключение к сервису с других ip-адресов
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", build =>
            {
                build.SetIsOriginAllowed(host => true)
                    .WithOrigins("localhost:8080")
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
            services.Configure<MtsConnectionOptions>(Configuration.GetSection("Mts"));

            // Настройка логирования для определенных элементов слежения (агрегатов, узлов и пр.)
            //TODO: Разобраться, почему не работает и запустить логирование
            // services.Configure<LoggingConfiguration>(Configuration.GetSection("LoggingConfiguration")); 

            //services.AddMvc()
            //    .AddJsonOptions(opt =>
            //    {
            //        opt.SerializerSettings.NullValueHandling = NullValueHandling.Ignore;
            //        opt.SerializerSettings.DateTimeZoneHandling = DateTimeZoneHandling.Utc;
            //    })
            //    .SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
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
            app.UseStaticFiles();
            app.UseDefaultFiles();
            app.UseCookiePolicy();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<MTSHub>("/MTSHub");
            });
        }
    }
}
