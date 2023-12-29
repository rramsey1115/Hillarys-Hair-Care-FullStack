using System.Runtime.InteropServices;
using HillarysHairCare.Models;
using Microsoft.EntityFrameworkCore;

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
*********************************************************************************************************
                                                ENDPOINTS
*********************************************************************************************************
 */

// GET all Stylists
app.MapGet("/api/stylists", (HillarysHairCareDbContext db) =>
{
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

// Get stylist by id
app.MapGet("/api/stylists/{id}", (HillarysHairCareDbContext db, int id) =>
{
    try
    {
        Stylist foundS = db.Stylists
        .Include(s => s.Appointments).ThenInclude(app => app.Customer)
        .Include(s => s.Appointments).ThenInclude(app => app.AppointmentServices).ThenInclude(aservices => aservices.Service)
        .SingleOrDefault(s => s.Id == id);

        if (foundS == null)
        {
            return Results.NotFound("No stylist with given id");
        }

        var result = new StylistDTO
        {
            Id = foundS.Id,
            Name = foundS.Name,
            Email = foundS.Email,
            Bio = foundS.Bio,
            ImgUrl = foundS.ImgUrl,
            IsActive = foundS.IsActive,
            Appointments = foundS.Appointments?.Select(a => new AppointmentDTO
            {
                Id = a.Id,
                StylistId = a.StylistId,
                CustomerId = a.CustomerId,
                Customer = new CustomerDTO
                {
                    Id = a.Customer.Id,
                    Name = a.Customer.Name,
                    Email = a.Customer.Email
                },
                AppointmentServices = a.AppointmentServices?.Select(asvc => new AppointmentServiceDTO
                {
                    Id = asvc.Id,
                    AppointmentId = asvc.AppointmentId,
                    ServiceId = asvc.ServiceId,
                    Service = new ServiceDTO
                    {
                        Id = asvc.Service.Id,
                        Name = asvc.Service.Name,
                        Price = asvc.Service.Price
                    }
                }).ToList()
            }).ToList()
        };
#pragma warning restore CS8601 // Possible null reference assignment.
        return Results.Ok(result);
    }

    catch (Exception ex)
    {
        return Results.NotFound(ex);
    }
});

// Deactivate/Activate stylist by id
app.MapPut("/api/stylists/{id}/deactivate", (HillarysHairCareDbContext db, int id) =>
{
    Stylist matchedStylist = db.Stylists.SingleOrDefault(s => s.Id == id);
    if (matchedStylist == null)
    {
        return Results.NotFound("No stylist with given id");
    }
    matchedStylist.IsActive = !matchedStylist.IsActive;
    db.SaveChanges();
    return Results.NoContent();
});

// Add/Post new stylist
app.MapPost("/api/stylists", (HillarysHairCareDbContext db, Stylist stylist) => {
    try
    {
        db.Stylists.Add(stylist);
        db.SaveChanges();
        return Results.Created($"/api/stylists/{stylist.Id}", stylist);
    }
    catch (Exception ex)
    {
        return Results.BadRequest($"Bad data submitted: {ex}");
    }
});

// GET all Customers
app.MapGet("/api/customers", (HillarysHairCareDbContext db) =>
{
    return db.Customers.OrderBy(c => c.Id).Select(c => new CustomerDTO
    {
        Id = c.Id,
        Name = c.Name,
        Email = c.Email
    }).ToList();
});

// Get Customer by id
app.MapGet("/api/customers/{id}", (HillarysHairCareDbContext db, int id) =>
{
    try
    {
        Customer foundC = db.Customers
        .Include(c => c.Appointments).ThenInclude(a => a.Stylist)
        .Include(c => c.Appointments).ThenInclude(a => a.AppointmentServices).ThenInclude(aserv => aserv.Service)
        .SingleOrDefault(c => c.Id == id);

        if (foundC == null)
        {
            return Results.NotFound("No customer with given id");
        }

        return Results.Ok(new CustomerDTO
        {
            Id = foundC.Id,
            Name = foundC.Name,
            Email = foundC.Email,
            Appointments = foundC.Appointments.Select(app => new AppointmentDTO
            {
                Id = app.Id,
                StylistId = app.StylistId,
                Stylist = new StylistDTO
                {
                    Id = app.Stylist.Id,
                    Name = app.Stylist.Name,
                    Email = app.Stylist.Email,
                    Bio = app.Stylist.Bio,
                    ImgUrl = app.Stylist.ImgUrl
                },
                CustomerId = foundC.Id,
                Date = app.Date,
                AppointmentServices = app.AppointmentServices.Select(s => new AppointmentServiceDTO
                {
                    Id = s.Id,
                    AppointmentId = s.AppointmentId,
                    ServiceId = s.ServiceId,
                    Service = new ServiceDTO
                    {
                        Id = s.Service.Id,
                        Name = s.Service.Name,
                        Price = s.Service.Price
                    }
                }).ToList()
            }).ToList()
        });
    }

    catch (Exception ex)
    {
        return Results.NotFound(ex);
    }
});

// Get Customer appointments by customerId
app.MapGet("/api/appointments/customer/{id}", (HillarysHairCareDbContext db, int id) =>
{
    try
    {
        List<Appointment> filtered = db.Appointments
        .Include(a => a.Stylist)
        .Include(a => a.AppointmentServices).ThenInclude(s => s.Service)
        .Where(a => a.CustomerId == id)
        .ToList();

        if (filtered == null)
        {
            return Results.NotFound("no matching appointments");
        }

        return Results.Ok(filtered.Select(f => new AppointmentDTO
        {
            Id = f.Id,
            StylistId = f.StylistId,
            Stylist = new StylistDTO
            {
                Id = f.Stylist.Id,
                Name = f.Stylist.Name,
                Email = f.Stylist.Email,
                Bio = f.Stylist.Bio
            },
            CustomerId = f.CustomerId,
            Date = f.Date,
            AppointmentServices = f.AppointmentServices.Select(apps => new AppointmentServiceDTO
            {
                Id = apps.Id,
                ServiceId = apps.ServiceId,
                Service = new ServiceDTO
                {
                    Id = apps.Service.Id,
                    Name = apps.Service.Name,
                    Price = apps.Service.Price
                }
            }).ToList()
        }).ToList());
    }
    catch (Exception ex)
    {
        return Results.NotFound(ex);
    }
});

// Add/Post new Customer
app.MapPost("/api/customers", (HillarysHairCareDbContext db, Customer customer) => {
    try
    {
        db.Customers.Add(customer);
        db.SaveChanges();
        return Results.Created($"/api/customers/{customer.Id}", customer);
    }
    catch (Exception ex)
    {
        return Results.BadRequest($"Bad data submitted: {ex}");
    }
});

// Get Stylist appointment by stylistId
app.MapGet("/api/appointments/stylist/{id}", (HillarysHairCareDbContext db, int id) =>
{
    try
    {
        List<Appointment> filtered = db.Appointments
        .Include(a => a.Customer)
        .Include(a => a.AppointmentServices).ThenInclude(s => s.Service)
        .Where(a => a.StylistId == id)
        .ToList();

        if (filtered == null)
        {
            return Results.NotFound("no matching appointments");
        }

        return Results.Ok(filtered.Select(f => new AppointmentDTO
        {
            Id = f.Id,
            StylistId = f.StylistId,
            Customer = new CustomerDTO
            {
                Id = f.Customer.Id,
                Name = f.Customer.Name,
                Email = f.Customer.Email
            },
            CustomerId = f.CustomerId,
            Date = f.Date,
            AppointmentServices = f.AppointmentServices.Select(apps => new AppointmentServiceDTO
            {
                Id = apps.Id,
                ServiceId = apps.ServiceId,
                Service = new ServiceDTO
                {
                    Id = apps.Service.Id,
                    Name = apps.Service.Name,
                    Price = apps.Service.Price
                }
            }).ToList()
        }).ToList());
    }
    catch (Exception ex)
    {
        return Results.NotFound(ex);
    }
});

// GET all Appointments
app.MapGet("/api/appointments", (HillarysHairCareDbContext db) =>
{
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

// GET Appointment by id
app.MapGet("/api/appointments/{id}", (HillarysHairCareDbContext db, int id) =>
{
    try
    {
        Appointment foundA = db.Appointments
        .Include(a => a.Customer)
        .Include(a => a.Stylist)
        .Include(a => a.AppointmentServices).ThenInclude(aserv => aserv.Service)
        .SingleOrDefault(a => a.Id == id);

        if (foundA == null)
        {
            return Results.NotFound("No appointment with given id");
        }

        return Results.Ok(new AppointmentDTO
        {
            Id = foundA.Id,
            StylistId = foundA.StylistId,
            Stylist = new StylistDTO
            {
                Id = foundA.Stylist.Id,
                Name = foundA.Stylist.Name,
                Email = foundA.Stylist.Email,
                Bio = foundA.Stylist.Bio
            },
            CustomerId = foundA.CustomerId,
            Customer = new CustomerDTO
            {
                Id = foundA.Customer.Id,
                Name = foundA.Customer.Name,
                Email = foundA.Customer.Email
            },
            Date = foundA.Date,
            AppointmentServices = foundA.AppointmentServices.Select(apps => new AppointmentServiceDTO
            {
                Id = apps.Id,
                ServiceId = apps.ServiceId,
                Service = new ServiceDTO
                {
                    Id = apps.Service.Id,
                    Name = apps.Service.Name,
                    Price = apps.Service.Price
                }
            }).ToList()
        });
    }
    catch (Exception ex)
    {
        return Results.NotFound(ex);
    }
});

// Add/Post new Appointment
app.MapPost("/api/appointments", (HillarysHairCareDbContext db, Appointment appointment) => {
    try
    {
        db.Appointments.Add(appointment);
        db.SaveChanges();
        return Results.Created($"/api/appointments/{appointment.Id}", appointment);
    }
    catch (Exception ex)
    {
        return Results.BadRequest($"Bad data submitted: {ex}");
    }
});

// Get all Services
app.MapGet("/api/services", (HillarysHairCareDbContext db) =>
{
    return db.Services.OrderBy(s => s.Id).Select(s => new ServiceDTO
    {
        Id = s.Id,
        Name = s.Name,
        Price = s.Price
    }).ToList();
});

// Get sercvice by id
app.MapGet("/api/services/{id}", (HillarysHairCareDbContext db, int id) => {
    try
    {
        Service foundS = db.Services.FirstOrDefault(s => s.Id == id);

        if (foundS == null)
        {
            return Results.NotFound("No appointment with given id");
        }

        return Results.Ok(new ServiceDTO {
            Id = foundS.Id,
            Name = foundS.Name,
            Price = foundS.Price
        });
    }
    catch (Exception ex)
    {
        return Results.NotFound($"Bad data given: {ex}");
    }
});

app.Run();