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
        // ��������� �������� ���������� �� ����� ������������ appsettings.json
        public IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            // ���������� ����� �������� ����������
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            // ��������� ����������� � ������� � ������ ip-�������
            services.AddCors(opt => opt.AddPolicy("CorsPolicy", build =>
            {
                build.SetIsOriginAllowed(host => true)
                    .WithOrigins("localhost:8080")
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials();
            }));

            // ������������� ������� ��� ������������� cookies
            services.Configure<CookiePolicyOptions>(options =>
            {
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            // ���������� ������ SignalR
            services.AddSignalR();

            // �������� ��������� ��� ����������� � ������� MTSService �� ����� ��������
            services.Configure<MtsConnectionOptions>(Configuration.GetSection("Mts"));

            // ��������� ����������� ��� ������������ ��������� �������� (���������, ����� � ��.)
            //TODO: �����������, ������ �� �������� � ��������� �����������
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
