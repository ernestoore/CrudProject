using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class ProductSoldModel
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int CustomerId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }

        public CustomerModel Customer { get; set; }
        public ProductModel Product { get; set; }
        public StoreModel Store { get; set; }

        public string ProductName { get; internal set; }
        public string StoreName { get; internal set; }
        public string CustomerName { get; internal set; }
    }
}
