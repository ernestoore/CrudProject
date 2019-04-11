using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class ProductController : Controller
    {
        StoreProjectContext db = new StoreProjectContext();

        public ActionResult ProductView()
        {
            return View();
        }

        // Get Products

        public JsonResult GetProductList()
        {
            List<ProductModel> ProdList = db.Product.Select(x => new ProductModel
            {
                Id = x.Id,
                Name = x.Name,
                Price = x.Price
                
            }).ToList();
            
            return Json(ProdList);
           
        }

        // CREATE PRODUCT

        public JsonResult CreateProduct(ProductModel product)
        {
            var prod = new ProductModel();
            if (ModelState.IsValid)
            {
                prod.Id = product.Id;
                prod.Name = product.Name;
                prod.Price = product.Price;
            }
            try
            {                
                db.Product.Add(prod);
                db.SaveChanges();
                Console.Write("success");
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception occurred");
                return Json(new { Data = "Product create failed" });
            }

            return Json(new { Data = "Success" });
        }

        // DELETE PRODUCT

        public JsonResult DeleteProduct(int Id)
        {
            try
            {
                var product = db.Product.Where(x => x.Id == Id).SingleOrDefault();
                if (product != null)
                {
                    db.Product.Remove(product);
                    db.SaveChanges();
                    Console.Write("Delete success");
                }
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception occurred");
                return Json(new { Data = "Product delete failed" });
            }
            return Json(new { Data = "Success" });
        }

        // UPDATE PRODUCT

        public JsonResult GetUpdateProduct(int Id)
        {
            try
            {
                ProductModel product = db.Product.Where(x => x.Id == Id).SingleOrDefault();
                string value = JsonConvert.SerializeObject(product, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                return Json(value);
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception occurred");
                return Json(new { Data = "Product not found" });
            }
        }

        public JsonResult UpdateProduct(ProductModel product)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    ProductModel prod = db.Product.Where(x => x.Id == product.Id).SingleOrDefault();
                    prod.Name = product.Name;
                    prod.Price = product.Price;
                    db.SaveChanges();
                    Console.Write("Update Successful");

                }
                catch (Exception e)
                {
                    Console.Write(e.Data + "Exception occurred");
                    return Json(new { Data = "Product not found" });
                }
                
            }
            return Json(new { Data = "Success" });
        }




    }
}
