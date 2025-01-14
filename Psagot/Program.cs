using BL;
using DL;

using Entities.Contexts;
using Entities.DTO;
using Entities.Models;
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
            builder.Services.AddScoped<IMeetingDL, MeetingDL>();
            builder.Services.AddScoped<IMeetingBL, MeetingBL>();
            builder.Services.AddScoped<IDaysForCourseDL,DaysForCourseDL>();
            builder.Services.AddScoped<IDaysForCourseBL, DaysForCourseBL>();
            builder.Services.AddScoped<IScheduleForTopicBL, ScheduleForTopicBL>();
            builder.Services.AddScoped<ITopicBL, TopicBL>();
            builder.Services.AddScoped<IScheduleForTopicDL,ScheduleForTopicDL >();
            builder.Services.AddScoped<ITopicDL, TopicDL>();


            builder.Services.AddScoped<ICourseDL, CourseDL>();
            builder.Services.AddScoped<ICourseBL, CourseBL>();

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