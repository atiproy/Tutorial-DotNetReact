using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Basket
    {
        public int Id { get; set; }
        public string BuyerId { get; set; }
        public List<BasketItem> Items { get; set; } = new();

        public void AddItem(Product product, int quantity)
        {
            if (Items.All(items => items.ProductId != product.Id))
            {
                Items.Add(new BasketItem
                {
                    Product = product,
                    Quantity = quantity
                });
            }
            else
            {
                var existingItem = Items.FirstOrDefault(item => item.ProductId == product.Id);
                existingItem.Quantity += quantity;
            }
        }

        public void RemoveItem(Product product, int quantity)
        {
            var item = Items.FirstOrDefault(item => item.ProductId == product.Id);
            if (item == null) return;

            item.Quantity -= quantity;
            if (item.Quantity == 0) Items.Remove(item);
        }

    }
}