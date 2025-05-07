using AutoMapper;
using Entities.DTO;
using Entities.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<DateTime, DateOnly>().ConvertUsing(dt => DateOnly.FromDateTime(dt));
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
        CreateMap<User, UserDTO>().ForMember(dest => dest.UserTypeName,
                opt => opt.MapFrom(src => src.UserType.Name)).ReverseMap();
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
        CreateMap<CourseDTO, Course>();
        CreateMap<Course, CourseDTO>()
            .ForMember(dest => dest.CoordinatorName, opt => opt.MapFrom(src => src.Coordinator.Name));
        CreateMap<CourseDTO, Course>();
        CreateMap<StatusCourse, StatusCourseDTO>().ReverseMap();

    }
}