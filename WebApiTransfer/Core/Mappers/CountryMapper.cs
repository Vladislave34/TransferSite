using AutoMapper;
using Core.Models.Location;
using Domain.Entities.Locations;

namespace Core.Mappers;

public class CountryMapper : Profile
{
    public CountryMapper()
    {
        CreateMap<CountryEntity, CountryItemModel>();
        CreateMap<CountryCreateModel, CountryEntity>()
            .ForMember(x=>x.image, opt=> opt.Ignore());
        CreateMap<CountryEditModel, CountryEntity>()
            .ForMember(x=>x.image, opt=> opt.Ignore());
    }
    
}