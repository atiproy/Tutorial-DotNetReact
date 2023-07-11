using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class BasketController : BaseApiController
    {
        private readonly StoreContext _context;
        public BasketController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet(Name = "GetBasket")]
        public async Task<ActionResult<BasketDto>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return MapBasketToDTO(basket);

        }

        private static ActionResult<BasketDto> MapBasketToDTO(Basket basket)
        {
            return new BasketDto
            {
                Id = basket.Id,
                BuyerId = basket.BuyerId,
                Items = basket.Items.Select(s => new BasketItemDto
                {
                    ProductId = s.ProductId,
                    Name = s.Product.Name,
                    Price = s.Product.Price,
                    PictureUrl = s.Product.PictureUrl,
                    Type = s.Product.Type,
                    Brand = s.Product.Brand,
                    Quanity = s.Quantity
                }).ToList()
            };
        }

        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quanity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if (product == null) return NotFound();
            basket.AddItem(product, quanity);

            var result = await _context.SaveChangesAsync() > 0;

            if (result) return CreatedAtRoute("GetBasket", MapBasketToDTO(basket));
            return BadRequest(new ProblemDetails { Title = "Problem saving item to Basket" });
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quanity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) return NotFound();

            basket.RemoveItem(productId, quanity);
            var result = await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(202);
            return BadRequest(new ProblemDetails { Title = "Problem deleting item to Basket" });
        }



        private async Task<Basket> RetrieveBasket()
        {
            return await _context.Baskets
                                .Include(i => i.Items)
                                .ThenInclude(t => t.Product)
                                .FirstOrDefaultAsync(f => f.BuyerId == Request.Cookies["buyerId"]);
        }

        private Basket CreateBasket()
        {
            var buyerID = Guid.NewGuid().ToString();
            var cookieOption = new CookieOptions { IsEssential = true, Expires = DateTime.Now.AddDays(30) };
            Response.Cookies.Append("buyerId", buyerID, cookieOption);
            var basket = new Basket { BuyerId = buyerID };
            _context.Baskets.Add(basket);
            return basket;
        }
    }
}