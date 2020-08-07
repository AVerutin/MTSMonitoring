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
                    .WithOrigins("localhost:5001")
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
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
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

            //DefaultFilesOptions options = new DefaultFilesOptions();
            //options.DefaultFileNames.Clear();
            //options.DefaultFileNames.Add("index.html");
            //app.UseDefaultFiles(options);

            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseCookiePolicy();
            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapHub<MTSHub>("/MTSHub");
            });
            logger.LogInformation("��������� ���������� {0}", env.ContentRootPath + "\\" + env.ApplicationName);
        }
    }
}
