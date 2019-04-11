﻿using System;
using System.Collections.Generic;

namespace Boilerplate.Web.App.Models
{
    public partial class StoreModel
    {
        public StoreModel()
        {
            ProductSold = new HashSet<ProductSoldModel>();
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }

        public ICollection<ProductSoldModel> ProductSold { get; set; }
    }
}
