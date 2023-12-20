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
    public List<AppointmentService> AppointmentServices { get; set; }
    public decimal TotalCost
    {
        get
        {
            decimal price = 25.00M;
            AppointmentServices.Select(s => price += s.Service.Price);
            return price;
        }
    }
}