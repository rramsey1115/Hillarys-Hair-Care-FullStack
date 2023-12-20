using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models;

public class AppointmentService
{
    public int Id { get; set; }
    [Required]
    public int AppointmentId { get; set; }
    [Required]
    public int ServiceId { get; set; }
    public Service Service { get; set; }
}