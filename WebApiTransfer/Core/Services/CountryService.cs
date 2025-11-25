using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Location;
using Domain;
using Domain.Entities.Locations;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CountryService(AppDbTransferContext appDbTransferContext, IMapper mapper, IImageService imageService) : ICountryService
{
    public async Task<List<CountryItemModel>> GetListAsync()
    {
        var list = await appDbTransferContext.Countries
            .Where(c => c.IsDeleted == false)
            .ProjectTo<CountryItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();
        return list;
    }

    public async Task<CountryItemModel> CreateAsync(CountryCreateModel model)
    {
        var entity = mapper.Map<CountryEntity>(model);
        if (model != null)
        {
            entity.image = await imageService.UploadImageAsync(model.Image);
        }
        await appDbTransferContext.Countries.AddAsync(entity);
        await appDbTransferContext.SaveChangesAsync();
        var item = mapper.Map<CountryItemModel>(entity);

        return item;
    }

    public async Task DeleteAsync(int id)
    {
        var entity = await appDbTransferContext.Countries.SingleOrDefaultAsync(x => x.Id == id);
        if (entity != null)
        {
            entity.IsDeleted = true;
        }
        await appDbTransferContext.SaveChangesAsync();
        
    }

    public async Task<CountryItemModel> EditAsync(CountryEditModel model)
    {
        var entity = await appDbTransferContext.Countries.FindAsync(model.Id);

        if (entity == null)
            throw new Exception("Country not found");

        
        mapper.Map(model, entity);


        
        if (model.image != null)
        {
            entity.image = await imageService.UpdateImageAsync(model.image, entity.image);
        }

        await appDbTransferContext.SaveChangesAsync();

        return mapper.Map<CountryItemModel>(entity);
    }
    

   
}