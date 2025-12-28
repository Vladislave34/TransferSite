using AutoMapper;
using Core.Models.Edentity.Account;
using Domain.Entities.Identity;

namespace Core.Mappers;

public class UserMapper : Profile
{
    public UserMapper()
    {
        CreateMap<UserEntity, UserProfileModel>()
            .ForMember(dest => dest.FullName, opt => opt.MapFrom(src => $"{src.FirstName} {src.LastName}"))
            .ForMember(dest => dest.Phone, opt => opt.MapFrom(src => src.PhoneNumber));
        
        CreateMap<UserEntity, UserItemModel>()
            .ForMember(x => x.FullName, opt => opt.MapFrom(x => $"{x.LastName} {x.FirstName}"))
            .ForMember(dest => dest.Roles, opt => opt.MapFrom(src => src.UserRoles!.Select(ur => ur.Role.Name).ToList()));
    }
}