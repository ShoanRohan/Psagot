using BL;
using DL;
using Entities.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;

namespace Psagot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<PsagotDbContext>(options =>

    options.UseSqlServer(builder.Configuration.GetConnectionString("PsagotDbContext")));


            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });

                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    Name = "Authorization",
                    Type = SecuritySchemeType.Http,
                    Scheme = "Bearer",
                    BearerFormat = "JWT",
                    In = ParameterLocation.Header,
                    Description = "JWT Authorization header using the Bearer scheme. \r\n\r\n Enter 'Bearer' [space] and then your token in the text input below.\r\n\r\nExample: \"Bearer 12345abcdef\""
                });

                c.AddSecurityRequirement(new OpenApiSecurityRequirement
                {
                    {
                        new OpenApiSecurityScheme
                        {
                            Reference = new OpenApiReference
                            {
                                Type = ReferenceType.SecurityScheme,
                                Id = "Bearer"
                            }
                        },
                        new string[] {}
                    }
                });
            });

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
