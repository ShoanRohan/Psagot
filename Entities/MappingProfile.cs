using AutoMapper;
using Entities.DTO;
using Entities.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<DateTime, DateOnly>().ConvertUsing(dt => DateOnly.FromDateTime(dt));
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
        CreateMap<User, UserDTO>()
            .ForMember(dest => dest.UserTypeName, opt => opt.MapFrom(src => src.UserType.Name));
        CreateMap<UserDTO, User>()
        .ForMember(dest => dest.UserType, opt => opt.Ignore());
        CreateMap<User, UserTableDTO>().ReverseMap();
        CreateMap<Room, RoomDTO>().ReverseMap();
        CreateMap<Day, DayDTO>().ReverseMap();
        CreateMap<Meeting, MeetingDTO>().ReverseMap();
        CreateMap<DaysForCourse, DaysForCourseDTO>().ForMember(dest => dest.DayName,
            opt => opt.MapFrom(src => src.Day.Descr)).ReverseMap();
        CreateMap<ScheduleForTopic, ScheduleForTopicDTO>().ReverseMap();
        CreateMap<Topic, TopicDTO>()
            .ForMember(dest => dest.Status, opt => opt.MapFrom(src => src.Status.Name))
            .ForMember(dest => dest.TeacherName, opt => opt.MapFrom(src => src.Teacher.Name))
            .ReverseMap();
        CreateMap<Course, CourseDTO>().ForMember(dest => dest.StatusName, opt => opt.MapFrom(src => src.Status.Name))
                    .ForMember(dest => dest.CoordinatorName, opt => opt.MapFrom(src => src.Coordinator.Name)).ReverseMap();
        CreateMap<StatusCourse, StatusCourseDTO>().ReverseMap();
        CreateMap<StatusTopic, StatusTopicDTO>().ReverseMap();
        CreateMap<User, UserTableDTO>().ForMember(dest => dest.UserTypeName,
              opt => opt.MapFrom(src => src.UserType.Name)).ReverseMap();

        CreateMap<Meeting, EventDTO>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.MeetingId))
            .ForMember(dest => dest.Title, opt => opt.MapFrom(src =>
                $"{(src.Course != null ? src.Course.Name : "ללא קורס")} - {(src.Topic != null ? src.Topic.Name : "ללא נושא")}"))
            .ForMember(dest => dest.Start, opt => opt.MapFrom(src => CombineDateAndTime(src.MeetingDate, src.StartTime)))
            .ForMember(dest => dest.End, opt => opt.MapFrom(src => CombineDateAndTime(src.MeetingDate, src.EndTime)))
            .ForMember(dest => dest.ExtendedProps, opt => opt.MapFrom(src =>
                new ExtendedProps
                {
                    Location = (src.Room != null ? src.Room.Name : "לא ידוע"),
                    Color = (src.Course != null && src.Course.Color != null ? src.Course.Color : "gray")
                }));
    }

    private DateTime CombineDateAndTime(DateOnly date, TimeOnly? time)
    {
        if (time == null)
            return date.ToDateTime(TimeOnly.MinValue);
        return date.ToDateTime(time.Value);
    }
}