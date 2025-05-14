using AutoMapper;
using Entities.DTO;
using Entities.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
        CreateMap<DaysForCourse, DaysForCourseDTO>().ReverseMap();
        CreateMap<MeetingDTO, Meeting>()
            .ForMember(dest => dest.MeetingId, opt => opt.Ignore()); // ID נוצר במסד
        CreateMap<Meeting, MeetingDTO>();
    }
}
