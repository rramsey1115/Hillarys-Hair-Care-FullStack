
using HillarysHairCare.Models;

public class AppointmentDTO
{
    public int Id { get; set; }
    public int StylistId { get; set; }
    public StylistDTO Stylist { get; set; }
    public int CustomerId { get; set; }
    public CustomerDTO Customer { get; set; }
    public DateTimeOffset Date { get; set; }
    public List<AppointmentServiceDTO> AppointmentServices { get; set; }
    public decimal? TotalCost
    {
        get
        {
            decimal price = 0;
            var res = AppointmentServices?.Select(appointmentS => appointmentS.Service.Price);
            return res != null && res.Any() ? res.Sum() + 25 : (decimal?)25;
        }
    }
    public bool? IsPast
    {
        get
        {
           if(Date < DateTime.Now)
           {
            return true;
           }
           else
           {
            return false;
           }
        }
    }
}