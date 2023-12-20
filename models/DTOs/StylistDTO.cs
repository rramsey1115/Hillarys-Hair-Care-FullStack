

public class StylistDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string ImgUrl { get; set; }
    public string Bio { get; set; }
    public bool IsActive { get; set; }
    public List<AppointmentDTO>? Appointments { get; set; }
}