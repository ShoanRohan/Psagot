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
        CreateMap<Course,CourseDTO> ().ReverseMap();
        CreateMap<StatusCourse, StatusCourseDTO>().ReverseMap();
        CreateMap<Topic, TopicDTO>()
            .ForMember(dest => dest.TeacherName, opt => opt.MapFrom(src => src.Teacher != null ? src.Teacher.Name : null))
            .ForMember(dest => dest.MeetingsCount, opt => opt.MapFrom(src => src.Meetings.Count))
            .ForMember(dest => dest.HasSchedule, opt => opt.MapFrom(src => src.ScheduleForTopics.Any()));
        CreateMap<CourseDTO, Course>()
            .ForMember(dest => dest.CoordinatorId, opt => opt.MapFrom(src => src.CoordinatorId));
        CreateMap<TopicDTO, Topic>();

    }
}
