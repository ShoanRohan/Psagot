using BL;
using DL;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Psagot
{
    public class Program
    {
        //TEST PR BETWEEN TAMIBIRJ1 TO TEAMJ1
        //DO MERGE
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<PsagotDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PsagotLocal")));

            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddScoped<IUserTypeDL, UserTypeDL>();
            builder.Services.AddScoped<IUserTypeBL, UserTypeBL>();

            builder.Services.AddControllers();
            builder.Services.AddCors();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();
            app.UseCors((service) => service.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
