using Core.Models.Location;

namespace Core.Interfaces;

public interface ICountryService
{
    Task<List<CountryItemModel>> GetListAsync();
    
    Task<CountryItemModel> GetByIdAsync(int id);
    
    Task<CountryItemModel> CreateAsync(CountryCreateModel model);
    
    Task DeleteAsync(int id);
    
    Task<CountryItemModel> EditAsync(CountryEditModel model);
}