using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DbMigration.Domains
{
  public class Customer
  {
    public Customer()
    {
      Orders = new HashSet<Order>();
    }

    public int CustomerId { get; set; }
    public string CompanyName { get; set; }
    // [StringLength(100)]
    [StringLength(100, MinimumLength = 2, ErrorMessage = "Invalid name.")]
    [Required]
    public string ContactName { get; set; }
    public string ContactTitle { get; set; }
    public string Address { get; set; }
    public string City { get; set; }
    public string Region { get; set; }
    public string PostalCode { get; set; }
    public string Country { get; set; }
    public string Phone { get; set; }
    public string Fax { get; set; }

    public ICollection<Order> Orders { get; private set; }
  }
}