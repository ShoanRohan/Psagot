using AutoMapper;
using Entities.DTO;
using Entities.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<User, UserDTO>().ForMember(dest => dest.UserTypeName,
                opt => opt.MapFrom(src => src.UserTypes.Name)).ReverseMap();
        CreateMap<Room, RoomDTO>().ReverseMap();
        CreateMap<Day, DayDTO>().ReverseMap();
        CreateMap<Meeting, MeetingDTO>().ReverseMap();
        CreateMap<DaysForCourse, DaysForCourseDTO>().ReverseMap();
        CreateMap<ScheduleForTopic, ScheduleForTopicDTO>().ReverseMap();
        CreateMap<Topic, TopicDTO>().ReverseMap();
        CreateMap<Course, CourseDTO>().ReverseMap();


    }
}
