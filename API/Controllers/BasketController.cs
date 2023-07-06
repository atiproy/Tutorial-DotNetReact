using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
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

        [HttpGet]
        public async Task<ActionResult<Basket>> GetBasket()
        {
            var basket = await RetrieveBasket();

            if (basket == null) return NotFound();
            return basket;
        }



        [HttpPost]
        public async Task<ActionResult> AddItemToBasket(int productId, int quanity)
        {
            var basket = await RetrieveBasket();
            if (basket == null) basket = CreateBasket();
            var product = await _context.Products.FindAsync(productId);
            if(product==null) return NotFound();
            basket.AddItem(product, quanity);

            var result= await _context.SaveChangesAsync() > 0;

            if (result) return StatusCode(201);
            return BadRequest(new ProblemDetails{Title="Problem saving item to Basket"});
        }



        [HttpDelete]
        public async Task<ActionResult> RemoveBasketItem(int productId, int quanity)
        {
            return Ok();
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