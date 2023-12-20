namespace HillarysHairCare.Models;

public class AppointmentServiceDTO
{
    public int Id { get; set; }
    public int AppointmentId { get; set; }
    public decimal ServiceId { get; set; }
    public ServiceDTO Service { get; set; }
}