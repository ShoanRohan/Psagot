using AutoMapper;
using Entities.DTO;
using Entities.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
<<<<<<< HEAD
            CreateMap<CourseDTO, Course>().ReverseMap();
=======
        CreateMap<Course, CourseDTO>().ReverseMap();
>>>>>>> ee8701327183736feeee9d3447c1bd34682ec980
    }
}