using Core.Models.Location;

namespace Core.Interfaces;

public interface ICityService
{
    Task<List<CityItemModel>> GetListAsync();
    Task<CityItemModel> CreateAsync(CityCreateModel model);
}
