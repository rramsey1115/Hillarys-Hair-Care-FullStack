using HillarysHairCare.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Http.Json;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// allows passing datetimes without time zone data 
AppContext.SetSwitch("Npgsql.EnableLegacyTimestampBehavior", true);

// allows our api endpoints to access the database through Entity Framework Core
builder.Services.AddNpgsql<HillarysHairCareDbContext>(builder.Configuration["HillarysHairCareDbConnectionString"]);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

/* 
****************************************************************************************************
                                           ENDPOINTS
****************************************************************************************************
 */

// GET all Stylists
app.MapGet("/api/stylists", (HillarysHairCareDbContext db) => {
    return db.Stylists.OrderBy(s => s.Id).Include(s => s.Appointments).Select(s => new StylistDTO
    {
        Id = s.Id,
        Name = s.Name,
        Email = s.Email,
        ImgUrl = s.ImgUrl,
        IsActive = s.IsActive,
        Bio = s.Bio
    }).ToList();
});

// GET all Customers
app.MapGet("/api/customers", (HillarysHairCareDbContext db) => {
    return db.Customers.OrderBy(c => c.Id).Select(c => new CustomerDTO
    {
        Id = c.Id,
        Name = c.Name,
        Email = c.Email
    }).ToList();
});

// GET all Appointments
app.MapGet("/api/appointments", (HillarysHairCareDbContext db) => {
    return db.Appointments
    .OrderBy(app => app.Date)
    .Include(app => app.Customer)
    .Include(app => app.Stylist)
    .Include(app => app.AppointmentServices).ThenInclude(aserv => aserv.Service)
    .Select(app => new AppointmentDTO
    {
        Id = app.Id,
        StylistId = app.StylistId,
        Stylist = new StylistDTO
        {
            Id = app.Stylist.Id,
            Name = app.Stylist.Name,
            Email = app.Stylist.Email,
            ImgUrl = app.Stylist.ImgUrl,
            Bio = app.Stylist.Bio,
            IsActive = app.Stylist.IsActive
        },
        CustomerId = app.CustomerId,
        Customer = new CustomerDTO
        {
            Id = app.Customer.Id,
            Name = app.Customer.Name,
            Email = app.Customer.Email
        },
        Date = app.Date,
        AppointmentServices = app.AppointmentServices.Select(aserv => 
            new AppointmentServiceDTO
            {
                Id = aserv.Id,
                AppointmentId = aserv.AppointmentId,
                ServiceId = aserv.ServiceId,
                Service = new ServiceDTO
                {
                    Id = aserv.Service.Id,
                    Name = aserv.Service.Name,
                    Price = aserv.Service.Price
                }
        }).ToList()
    }).ToList();
});

// Get all Services
app.MapGet("/api/services", (HillarysHairCareDbContext db) => {
    return db.Services.OrderBy(s => s.Id).Select(s => new ServiceDTO
    {
        Id = s.Id,
        Name = s.Name,
        Price = s.Price
    }).ToList();
});



app.Run();
