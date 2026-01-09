using AutoMapper;
using AutoMapper.QueryableExtensions;
using Core.Interfaces;
using Core.Models.Cart;
using Domain;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Core.Services;

public class CartService(AppDbTransferContext context, IAuthService authService, IMapper mapper )   : ICartService
{
    public async  Task AddUpdateAsync(CartAddUpdateModel model)
    {
        var userId = await authService.GetUserIdAsync();
        var cartItem = await context.Carts
            .SingleOrDefaultAsync(c =>
                c.UserId == userId
                && c.TransportationId == model.TransportationId);
        if (cartItem == null)
        {
            cartItem = new CartEntity
            {
                UserId = userId,
                TransportationId = model.TransportationId,
                CountTikets = model.Quantity
            };
            context.Carts.AddAsync(cartItem);
        }
        else
        {
            cartItem.CountTikets = model.Quantity;
        }
        context.SaveChangesAsync();
    }

    public async Task<List<CartItemModel>> GetListAsync()
    {
        var userId = await authService.GetUserIdAsync();
        var result = await context.Carts
            .Where(c => c.UserId == userId)
            .ProjectTo<CartItemModel>(mapper.ConfigurationProvider)
            .ToListAsync();

        return result;
    }

    public async Task DeleteAsync(int transportationId)
    {
        var cartItems = await context.Carts
            .Where(c => c.TransportationId == transportationId)
            .ToListAsync();

        if (!cartItems.Any())
            return;

        context.Carts.RemoveRange(cartItems);
        await context.SaveChangesAsync();
    }
}