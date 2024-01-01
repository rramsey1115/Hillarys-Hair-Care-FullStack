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
    public DateTimeOffset Date { get; set; }
    public List<AppointmentService> AppointmentServices { get; set; }
    public decimal? TotalCost
    {
        get
        {
            decimal price = 0;
            var res = AppointmentServices?.Select(appointmentS => appointmentS.Service.Price);
            return res != null && res.Any() ? res.Sum() + 25 : (decimal?)25;
        }
    }
}