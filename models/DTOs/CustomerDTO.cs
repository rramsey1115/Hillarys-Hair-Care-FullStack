

public class CustomerDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public List<AppointmentDTO>? Appointments { get; set; }
}