using System.ComponentModel.DataAnnotations;

namespace HillarysHairCare.Models;

public class Stylist
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Email { get; set; }
    [Required]
    public string ImgUrl { get; set; }
    [Required]
    public string Bio { get; set; }
    [Required]
    public bool IsActive { get; set; }
    public List<Appointment>? Appointments { get; set; }
}