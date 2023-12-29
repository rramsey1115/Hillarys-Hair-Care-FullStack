using Microsoft.EntityFrameworkCore;
using HillarysHairCare.Models;

public class HillarysHairCareDbContext : DbContext
{

    public DbSet<Stylist> Stylists { get; set; }
    public DbSet<Customer> Customers { get; set; }
    public DbSet<Appointment> Appointments { get; set; }
    public DbSet<Service> Services { get; set; }
    public DbSet<AppointmentService> AppointmentServices { get; set; }

    public HillarysHairCareDbContext(DbContextOptions<HillarysHairCareDbContext> context) : base(context)
    {

    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Stylists
        modelBuilder.Entity<Stylist>().HasData(new Stylist[]
        {
            new Stylist { Id = 1, Name="Violet Blankenship" ,Email="violetb@gmail.com", ImgUrl="https://images.pexels.com/photos/2805050/pexels-photo-2805050.jpeg?auto=compress&cs=tinysrgb&w=800", Bio="Violet has been a hair stylist for 5 years, 2 of them here at Hillary's. Violet loves to build strong connections and trust with her clients.", IsActive=true },
            new Stylist { Id = 2, Name="Hillary Reed" ,Email="hillaryr@gmail.com", ImgUrl="https://images.pexels.com/photos/3021554/pexels-photo-3021554.jpeg?auto=compress&cs=tinysrgb&w=800", Bio="Hillary is not only a stylist but has been owner-operate of Hillary's Hair Care for 6 years. Her business is thriving and all of her customers don't mind waiting to get in with her! Make your appointment soon!", IsActive=true },
            new Stylist { Id = 3, Name="Lisa Tomas" ,Email="lisat@gmail.com", ImgUrl="https://images.pexels.com/photos/654696/pexels-photo-654696.jpeg?auto=compress&cs=tinysrgb&w=800", Bio="Lisa is a long time stylist, with experience in many services and styling practices. Although she is our newest stylist, she is already building a strong network of clients!", IsActive=true },
            new Stylist { Id = 4, Name="Nate Vissel" ,Email="natev@gmail.com", ImgUrl="https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=800", Bio="Nate was the first stylist hired on my Hillary when she decided to open her own salon. They have been best friends since high school, and fell in love with styling together. Nate loves staying on top of the hottest new trends, and would love to add you to his long list of regulars. ", IsActive=true },
            new Stylist { Id = 5, Name="Victoria Byron" ,Email="victorad@gmail.com", ImgUrl="https://images.pexels.com/photos/3108924/pexels-photo-3108924.jpeg?auto=compress&cs=tinysrgb&w=800", Bio="Victoria is a personable and high energy stylist who loves treating her clients like royalty. With several years of experience working with many hair types and styles, if in doubt, she's the stylist for you!", IsActive=false }
        });

        // Customers
        modelBuilder.Entity<Customer>().HasData(new Customer[]
        {
            new Customer { Id = 1, Name="Angel Iglesias" ,Email="angeliglegias@gmail.com" },
            new Customer { Id = 2, Name="Beatrice LeStrange" ,Email="blestrange@gmail.com" },
            new Customer { Id = 3, Name="Reed Tyler" ,Email="rtyler@gmail.com" },
            new Customer { Id = 4, Name="Grant Holland" ,Email="gholland@gmail.com" },
            new Customer { Id = 5, Name="Bruce Weller" ,Email="bweller@gmail.com" },
            new Customer { Id = 6, Name="Margot Vereen" ,Email="mvereen@gmail.com" },
            new Customer { Id = 7, Name="Petunia Quantz" ,Email="pquantz@gmail.com" },
            new Customer { Id = 8, Name="Sammy Nguyen" ,Email="snguyen@gmail.com" },
            new Customer { Id = 9, Name="Bianca Hezberdeen" ,Email="bhezberdeen@gmail.com" },
            new Customer { Id = 10, Name="Clint Michaels" ,Email="cmichaels@gmail.com" }
        });

        // Services
        modelBuilder.Entity<Service>().HasData(new Service[]
        {
            new Service { Id=1, Name="Haircut", Price=20},
            new Service { Id=2, Name="Keratin Treatment", Price=40},
            new Service { Id=3, Name="Beard/Eyebrow Shaping", Price=10},
            new Service { Id=4, Name="Hair Coloring", Price=60},
            new Service { Id=5, Name="Formal Styling", Price=50}
        });

        // Appointments
        modelBuilder.Entity<Appointment>().HasData(new Appointment[]
        {
            new Appointment
            {
                Id = 1,
                CustomerId=1,
                StylistId=2,
                Date= new DateTime(2024, 01, 04, 10, 00, 00)
            },
            new Appointment
            {
                Id = 2,
                CustomerId=3,
                StylistId=1,
                Date= new DateTime(2024, 01, 15, 13, 00, 00)
            },
            new Appointment
            {
                Id = 3,
                CustomerId=5,
                StylistId=3,
                Date= new DateTime(2024, 02, 22, 09, 00, 00)
            },
            new Appointment
            {
                Id = 4,
                CustomerId=2,
                StylistId=4,
                Date= new DateTime(2024, 01, 16, 16, 00, 00)
            },
            new Appointment
            {
                Id = 5,
                CustomerId=8,
                StylistId=1,
                Date= new DateTime(2024, 02, 05, 11, 00, 00)
            },
            new Appointment
            {
                Id = 6,
                CustomerId=10,
                StylistId=1,
                Date= new DateTime(2024, 02, 18, 09, 00, 00)
            },
            new Appointment
            {
                Id = 7,
                CustomerId=6,
                StylistId=3,
                Date= new DateTime(2024, 01, 03, 13, 00, 00)
            },
            new Appointment
            {
                Id = 8,
                CustomerId=4,
                StylistId=2,
                Date= new DateTime(2024, 02, 19, 15, 00, 00)
            },
            new Appointment
            {
                Id = 9,
                CustomerId=7,
                StylistId=4,
                Date= new DateTime(2024, 02, 27, 17, 00, 00)
            },
            new Appointment
            {
                Id = 10,
                CustomerId=10,
                StylistId=1,
                Date= new DateTime(2024, 01, 20, 10, 00, 00)
            }
        });

        // AppointmentServices
        modelBuilder.Entity<AppointmentService>().HasData(new AppointmentService[]
        {
            new AppointmentService { Id = 1, AppointmentId = 1, ServiceId = 1},
            new AppointmentService { Id = 2, AppointmentId = 1, ServiceId = 3},
            new AppointmentService { Id = 3, AppointmentId = 2, ServiceId = 2},
            new AppointmentService { Id = 4, AppointmentId = 2, ServiceId = 4},
            new AppointmentService { Id = 5, AppointmentId = 3, ServiceId = 1},
            new AppointmentService { Id = 6, AppointmentId = 3, ServiceId = 5},
            new AppointmentService { Id = 7, AppointmentId = 4, ServiceId = 2},
            new AppointmentService { Id = 8, AppointmentId = 4, ServiceId = 3},
            new AppointmentService { Id = 9, AppointmentId = 5, ServiceId = 4},
            new AppointmentService { Id = 10, AppointmentId = 5, ServiceId = 5},
            new AppointmentService { Id = 11, AppointmentId = 6, ServiceId = 1},
            new AppointmentService { Id = 12, AppointmentId = 7, ServiceId = 1},
            new AppointmentService { Id = 13, AppointmentId = 8, ServiceId = 2},
            new AppointmentService { Id = 14, AppointmentId = 9, ServiceId = 1},
            new AppointmentService { Id = 15, AppointmentId = 9, ServiceId = 3},
            new AppointmentService { Id = 16, AppointmentId = 10, ServiceId = 1},
            new AppointmentService { Id = 17, AppointmentId = 10, ServiceId = 4},
        });
    }
}