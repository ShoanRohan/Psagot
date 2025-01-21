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
    }
}