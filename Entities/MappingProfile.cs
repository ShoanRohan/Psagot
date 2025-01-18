using AutoMapper;
using Entities.DTO;
using Entities.Models;

public class MappingProfile : Profile
{
    public MappingProfile()
    {

        // מיפוי UserType ל-UserTypeDTO
        CreateMap<UserType, UserTypeDTO>().ReverseMap();

        // מיפוי User ל-UserDTO, הוספת מיפוי לשדה UserTypeName מתוך UserType
        CreateMap<User, UserDTO>()
            .ForMember(dest => dest.UserTypeName, opt => opt.MapFrom(src => src.UserType.Name))  // מיפוי שם UserType ל-UserTypeName
            .ForMember(dest => dest.UserTypeId, opt => opt.MapFrom(src => src.UserTypeId)) // מיפוי של UserTypeId
            .ReverseMap();
        // מיפויים נוספים
        CreateMap<Room, RoomDTO>().ReverseMap();
        CreateMap<Day, DayDTO>().ReverseMap();
    }
}
