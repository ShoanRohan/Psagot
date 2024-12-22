using AutoMapper;
using Entities.DTO;
using Psagot.Models;

namespace Psagot
{
    public class ClientUserProfile : Profile
    {
        public ClientUserProfile()
        {
            CreateMap<CreateUserRequest, UserDTO>();
            
        }
    }
}

