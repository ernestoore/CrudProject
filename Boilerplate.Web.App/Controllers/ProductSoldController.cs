using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class ProductSoldController : Controller
    {
        StoreProjectContext db = new StoreProjectContext();

        public ActionResult SaleView()
        {
            return View();
        }

        // GET SELL LIST

           public JsonResult GetProductSoldList()
           {
                List<ProductSoldModel> sell = db.ProductSold.Select(x => new ProductSoldModel
                {
                Id = x.Id,
                DateSold = x.DateSold,
                ProductId = x.ProductId,
                CustomerId = x.CustomerId,
                StoreId = x.StoreId,
                ProductName = x.Product.Name,
                CustomerName = x.Customer.Name,
                StoreName = x.Store.Name              

                }).ToList();
            return Json(sell);
           }

                // CREATE SELL
        public JsonResult CreateSale (ProductSoldModel productSold)
        {
            var sell = new ProductSoldModel();
            if (ModelState.IsValid)
            {
                sell.DateSold = productSold.DateSold;
                sell.CustomerId = productSold.CustomerId;
                sell.ProductId = productSold.ProductId;
                sell.StoreId = productSold.StoreId;
                sell.ProductName = productSold.ProductName;
                sell.CustomerName = productSold.CustomerName;
                sell.StoreName = productSold.StoreName;
                
            }
            try
            {
                db.ProductSold.Add(sell);
                db.SaveChanges();
                Console.Write("ProductSold successful");
                return Json(new { Data = "Success" });
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error occurred");
                return Json(new { Data = "Create sale failed" });
            }
        }

        // Delete SELL

        public JsonResult DeleteSell(int Id)
        {
            try
            {
                ProductSoldModel sell = db.ProductSold.Where(x => x.Id == Id).SingleOrDefault();
                if (sell != null)
                {
                    db.ProductSold.Remove(sell);
                    db.SaveChanges();
                    Console.Write("Delete sell successful");
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error occurred");
                return Json(new { Data = "Delete sell failed" });
            }
            return Json(new { Data = "Success" });
        }

        // GET UPDATE SELL

        public JsonResult GetUpdateSell(int Id)
        {
            try
            {
                ProductSoldModel sell = db.ProductSold.Where(x => x.Id == Id).SingleOrDefault();
                var value = JsonConvert.SerializeObject(sell, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                return Json(value);
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error occurred");
                return Json(new { Data = "Get sell update failed" });
            }
        }

        public JsonResult UpdateSell(ProductSoldModel productSold)
        {
            try
            {
                ProductSoldModel sell = db.ProductSold.Where(x => x.Id == productSold.Id).SingleOrDefault();
                sell.DateSold = productSold.DateSold;
                sell.CustomerId = productSold.CustomerId;
                sell.ProductId = productSold.ProductId;
                sell.StoreId = productSold.StoreId;
                db.ProductSold.Add(sell);
                db.SaveChanges();
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error occurred");
                return Json(new { Data = "Update sell failed" });
            }
            return Json(new { Data = "Success" });
            
        }
    }
}