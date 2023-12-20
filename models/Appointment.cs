using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models;

public class Appointment
{
    public int Id { get; set; }
    [Required]
    public int StylistId { get; set; }
    public Stylist Stylist { get; set; }
    [Required]
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public DateTime Date { get; set; }
    public List<Service> Services { get; set; }
    public decimal TotalCost
    {
        get
        {
            decimal price = 25.00M;
            Services.Select(s => price += s.Price);
            return price;
        }
    }
}