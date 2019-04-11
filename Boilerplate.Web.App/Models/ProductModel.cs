using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class ProductModel
    {
        public ProductModel()
        {
            ProductSold = new HashSet<ProductSoldModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }

        public ICollection<ProductSoldModel> ProductSold { get; set; }
    }
}
