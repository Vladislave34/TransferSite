using AutoMapper;
using Core.Models.Location;
using Domain.Entities.Locations;

namespace Core.Mappers;

public class CityMapper : Profile
{
    public CityMapper()
    {
        CreateMap<CityEntity, CityItemModel>()
            .ForMember(x => x.Country, opt => opt.MapFrom(x => x.Country.Name));;

        CreateMap<CityCreateModel, CityEntity>()
            .ForMember(x=>x.Image, opt=>opt.Ignore());
    }
}