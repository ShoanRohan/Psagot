using AutoMapper;
using Entities.DTO;
using Entities.Models;
using System;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
        CreateMap<User, UserDTO>().ForMember(dest => dest.UserTypeName,
                opt => opt.MapFrom(src => src.UserType.Name)).ReverseMap();
        CreateMap<Room, RoomDTO>().ReverseMap();
        CreateMap<Day, DayDTO>().ReverseMap();
        CreateMap<Meeting, MeetingDTO>().ReverseMap();
        CreateMap<DaysForCourse, DaysForCourseDTO>().ReverseMap();
        CreateMap<ScheduleForTopic, ScheduleForTopicDTO>().ReverseMap();
        CreateMap<Topic, TopicDTO>().ReverseMap();
        CreateMap<Course,CourseDTO> ().ReverseMap();

        CreateMap<Meeting,EventDTO>()
           .ForMember(dest => dest.EventId, opt => opt.MapFrom(src => src.MeetingId)) 
           .ForMember(dest => dest.Title, opt => opt.MapFrom(src => $"{src.Course.Name} - {src.Topic.Name}"))
           .ForMember(dest => dest.Start, opt => opt.MapFrom(src => CombineDateAndTime(src.MeetingDate, src.StartTime))) // חיבור של MeetingDate עם StartTime ל-DateTime
           .ForMember(dest => dest.End, opt => opt.MapFrom(src => CombineDateAndTime(src.MeetingDate, src.EndTime))) // חיבור של MeetingDate עם EndTime ל-DateTime
           .ForMember(dest => dest.ExtendedProps, opt => opt.MapFrom(src => new ExtendedProps
           {
               Location = src.Room.Name, 
               Color = src.Course.Color ?? "#000000"  // קבלת הצבע מהקורס, אם לא קיים צבע, מחזירים צבע ברירת מחדל
           }));
    }

    // פונקציה שמחברת DateOnly ו-TimeOnly ל-DateTime
    private DateTime CombineDateAndTime(DateOnly date, TimeOnly? time)
    {
        if (time == null)
            return date.ToDateTime(TimeOnly.MinValue); 
        return date.ToDateTime(time.Value); 
    }
}
   