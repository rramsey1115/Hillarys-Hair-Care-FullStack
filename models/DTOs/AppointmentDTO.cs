

using HillarysHairCare.Models;

public class AppointmentDTO
{
    public int Id { get; set; }
    public int StylistId { get; set; }
    public Stylist Stylist { get; set; }
    public int CustomerId { get; set; }
    public Customer Customer { get; set; }
    public DateTime Date { get; set; }
    public List<ServiceDTO> Services { get; set; }
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