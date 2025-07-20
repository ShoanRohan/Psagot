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
        CreateMap<UserDTO, User>()
             .ForMember(dest => dest.UserType, opt => opt.Ignore());
        //.ForMember(dest => dest.UserType.Name,
        //opt => opt.MapFrom(src => src.UserTypeName != null ? src.UserTypeName : null))
        //.ForMember(dest => dest.UserType.UserTypeId,
        //opt => opt.MapFrom(src => src.UserTypeId));
        CreateMap<Room, RoomDTO>().ReverseMap();
        CreateMap<Day, DayDTO>().ReverseMap();
        CreateMap<Meeting, MeetingDTO>().ReverseMap();
        CreateMap<DaysForCourse, DaysForCourseDTO>().ReverseMap();
        CreateMap<ScheduleForTopic, ScheduleForTopicDTO>().ReverseMap();
        CreateMap<Topic, TopicDTO>().ReverseMap();
        CreateMap<Course, CourseDTO>().ReverseMap();


    }
}
