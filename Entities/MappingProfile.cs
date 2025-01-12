﻿using AutoMapper;
using Entities.DTO;
using Entities.Models;


public class MappingProfile : Profile
{
    public MappingProfile()
    {
        CreateMap<Day, DayDTO>().ReverseMap();
        CreateMap<UserType, UserTypeDTO>().ReverseMap();
        CreateMap<User, UserDTO>().ReverseMap();
        CreateMap<Room, RoomDTO>().ReverseMap();
    }
}