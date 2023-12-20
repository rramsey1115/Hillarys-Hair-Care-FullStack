

using HillarysHairCare.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Binders;

public class AppointmentDTO
{
    public int Id { get; set; }
    public int StylistId { get; set; }
    public StylistDTO Stylist { get; set; }
    public int CustomerId { get; set; }
    public CustomerDTO Customer { get; set; }
    public DateTime Date { get; set; }
    public List<AppointmentServiceDTO> AppointmentServices { get; set; }
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