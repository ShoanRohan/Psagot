using BL;
using DL;
using DL.Entities;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace Psagot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);


            builder.Services.AddDbContext<PsagotDbContext>(options =>
<<<<<<< HEAD
    options.UseSqlServer(builder.Configuration.GetConnectionString("PsagotDbContext")));
=======
    options.UseSqlServer(builder.Configuration.GetConnectionString("PsagotDBConttext")));
>>>>>>> 5f8dd5aa752f1618b939d9b6ffcd7b748a047e26

            builder.Services.AddAutoMapper(typeof(MappingProfile));
            builder.Services.AddScoped<IUserTypeDL, UserTypeDL>();
            builder.Services.AddScoped<IUserTypeBL, UserTypeBL>();
            builder.Services.AddScoped<IRoomBL, RoomBL>();

            builder.Services.AddScoped<IRoomDL, RoomDL>();
            builder.Services.AddAutoMapper(typeof(Program));


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
