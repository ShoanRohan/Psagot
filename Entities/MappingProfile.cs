using AutoMapper;
using Entities.DTO;
using Entities.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
        CreateMap<User, UserDTO>().ReverseMap();
    }
}