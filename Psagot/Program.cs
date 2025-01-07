using BL;
using DL;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Psagot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<PsagotDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("PsagotDbContext")));

            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddScoped<IUserTypeDL, UserTypeDL>();
            builder.Services.AddScoped<IUserTypeBL, UserTypeBL>();
            builder.Services.AddScoped<IUserDL, UserDL>();
            builder.Services.AddScoped<IUserBL, UserBL>();
            builder.Services.AddScoped<IDayDL, DayDL>();
            builder.Services.AddScoped<IDayBL, DayBL>();


            builder.Services.AddScoped<IRoomDL, RoomDL>();
            builder.Services.AddScoped<IRoomBL, RoomBL>();


            builder.Services.AddControllers();
            builder.Services.AddCors();
            builder.Services.AddEndpointsApiExplorer();

            var app = builder.Build();
            app.UseCors((service) => service.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());


            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}