using AutoMapper;
using Entities.DTO;
using Entities.Models;


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
        CreateMap<Course, CourseDTO>().ForMember(dest => dest.StatusName, opt => opt.MapFrom(src => src.Status.Name))
            .ForMember(dest => dest.CoordinatorName, opt => opt.MapFrom(src => src.Coordinator.Name));
        CreateMap<CourseDTO, Course>();
    }
}