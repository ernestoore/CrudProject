using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Boilerplate.Web.App.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace Boilerplate.Web.App.Controllers
{
    public class CustomerController : Controller
    {
        StoreProjectContext db = new StoreProjectContext();
        
        public ActionResult CustomerView()
        {
            return View();
        }

        // Get Customer list

        public JsonResult GetCustomerList()
        {
            List<CustomerModel> CustomerList = db.Customer.Select(x => new CustomerModel
            {
                Id = x.Id,
                Name = x.Name,
                Address = x.Address
            }).ToList();
            return Json(CustomerList);
        }

        // CREATE CUSTOMER

        public JsonResult CreateCustomer(CustomerModel customer)
        {
            var cust = new CustomerModel();
            if (ModelState.IsValid)
            {
                cust.Id = customer.Id;
                cust.Name = customer.Name;
                cust.Address = customer.Address;
            }
            try
            {
                db.Customer.Add(cust);
                db.SaveChanges();
                Console.Write("Customer save in database");
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception occurred");
                return Json(new { Data = "Customer create failed" });
            }
            return Json(new { Data = "Success" });
        }

        // DELETE CUSTOMER

        public JsonResult DeleteCustomer(int Id)
        {
            try
            {
                CustomerModel customer = db.Customer.Where(x => x.Id == Id).SingleOrDefault();
                if (customer != null)
                {
                    db.Customer.Remove(customer);
                    db.SaveChanges();
                    Console.Write("Customer deleted");
                }
                
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception occurred");
                return Json(new { Data = "Customer delete failed" });
            }
            return Json(new { Data = "Success" });
        }

        // UPDATE CUSTOMER

        public JsonResult GetUpdateCustomer(int Id)
        {
            try
            {
                CustomerModel customer = db.Customer.Where(x => x.Id == Id).SingleOrDefault();
                string value = JsonConvert.SerializeObject(customer, Formatting.Indented, new JsonSerializerSettings
                {
                    ReferenceLoopHandling = ReferenceLoopHandling.Ignore
                });
                return Json(value);  
            }
            catch (Exception e)
            {
                Console.Write(e.Data + "Exception occured");
                return Json(new { Data = "Get update failed" });
            }
        }

        public JsonResult UpdateCustomer(CustomerModel customer)
        {
            if (ModelState.IsValid)
            {
                try
                {
                    CustomerModel cust = db.Customer.Where(x => x.Id == customer.Id).SingleOrDefault();
                    cust.Name = customer.Name;
                    cust.Address = customer.Address;
                    db.SaveChanges();
                    Console.Write("Custumer update successful");
                }
                catch (Exception e)
                {
                    Console.Write(e.Data + "Exception occurred");
                    return Json(new { Data = "Update failed" });
                }
            }
            
            return Json(new { Data = "Success" });
        }

    }
}