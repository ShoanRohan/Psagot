using AutoMapper;
using Entities.DTO;
using Entities.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
        CreateMap<User, UserDTO>()
     .ForMember(dest => dest.UserTypeName,
         opt => opt.MapFrom(src => src.UserType != null ? src.UserType.Name : null));
        CreateMap<UserDTO, User>();
        CreateMap<Room, RoomDTO>().ReverseMap();
        CreateMap<Day, DayDTO>().ReverseMap();
        CreateMap<Meeting, MeetingDTO>().ReverseMap();
        CreateMap<DaysForCourse, DaysForCourseDTO>().ReverseMap();
        CreateMap<ScheduleForTopic, ScheduleForTopicDTO>().ReverseMap();
        CreateMap<Topic, TopicDTO>().ReverseMap();
        CreateMap<StatusCourse, StatusCourseDTO>()
        .ForMember(dest => dest.StatusCourseId, opt => opt.MapFrom(src => src.StatusCourseId));
        CreateMap<StatusCourseDTO, StatusCourse>()
    .ForMember(dest => dest.StatusCourseId, opt => opt.MapFrom(src => src.StatusCourseId));
        CreateMap<Course, CourseDTO>()
    .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId))
    .ReverseMap()
    .ForMember(dest => dest.StatusId, opt => opt.MapFrom(src => src.StatusId));

    }
}
