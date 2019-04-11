using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class StoreController : Controller
    {

        StoreProjectContext db = new StoreProjectContext();


        public ActionResult StoreView()
        {
            return View();
        }

        // GET STORE LIST

        public JsonResult GetStoreList()
        {
            
                List<StoreModel> StoreList = db.Store.Select(x => new StoreModel {
                    Id = x.Id,
                    Name = x.Name,
                    Address = x.Address
                }).ToList();
                return Json(StoreList);
        }
        
        // CREATE STORE 

        public JsonResult CreateStore(StoreModel store)
        {
            var sto = new StoreModel();
            if (ModelState.IsValid)
            {
                sto.Address = store.Address;
                sto.Name = store.Name;
            }
            try
            {
                db.Store.Add(sto);
                db.SaveChanges();
                Console.Write("Store Created successfully");
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error occurred");
                return Json(new { Data = "Store create failed" });
            }

            return Json(new { Data = "Success" });
        }

        // DELETE STORE

        public JsonResult DeleteStore(int Id)
        {
            try
            {
                StoreModel sto = db.Store.Where(x => x.Id == Id).SingleOrDefault();
                if (sto != null)
                {
                    db.Store.Remove(sto);
                    db.SaveChanges();
                    Console.Write("Store deleted");
                }
                
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error occurred");
                return Json(new { Data = "Store delete failed" });
            }

            return Json(new { Data = "Success" });
        }

        // GET UPDATE STORE

        public JsonResult GetUpdateStore(int Id)
        {

            try
            {
                StoreModel sto = db.Store.Where(x => x.Id == Id).SingleOrDefault();
                var value = JsonConvert.SerializeObject(sto, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                return Json(value);
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error Occurred");
                return Json(new { Data = "Get Store Update failed" });
            }
        }

        public JsonResult UpdateStore(StoreModel store)
        {
            try
            {
                StoreModel sto = db.Store.Where(x => x.Id == store.Id).SingleOrDefault();
                sto.Name = store.Name;
                sto.Address = store.Address;
                db.SaveChanges();
                Console.Write("Update successful");
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Error Occurred");
                return Json(new { Data = "Store update failed" });
            }
            return Json(new { Data = "Successful" });
        }


    }
}