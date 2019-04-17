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
            var getSales = (from ps in db.ProductSold
                            join c in db.Customer on ps.CustomerId equals c.Id
                            join p in db.Product on ps.ProductId equals p.Id
                            join s in db.Store on ps.StoreId equals s.Id
                            select new { Customer = c.Name, Product = p.Name, Store = s.Name, ps.DateSold, ps.Id }).ToList();
            return Json(getSales);
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

        public JsonResult Deletesale(int Id)
        {
            try
            {
                ProductSoldModel sale = db.ProductSold.Where(x => x.Id == Id).SingleOrDefault();
                if (ModelState.IsValid)
                {
                    db.ProductSold.Remove(sale);
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

        public JsonResult UpdateSale(ProductSoldModel productSold)
        {
            ProductSoldModel sale = db.ProductSold.Where(x => x.Id == productSold.Id).SingleOrDefault();
            if (ModelState.IsValid)
            {
                sale.DateSold = productSold.DateSold;
                sale.CustomerId = productSold.CustomerId;
                sale.ProductId = productSold.ProductId;
                sale.StoreId = productSold.StoreId;
            }
            try
            {
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