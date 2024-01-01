using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace HillarysHairCare.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Services",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Price = table.Column<decimal>(type: "numeric", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Services", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Stylists",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    ImgUrl = table.Column<string>(type: "text", nullable: false),
                    Bio = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Stylists", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Appointments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    StylistId = table.Column<int>(type: "integer", nullable: false),
                    CustomerId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateTimeOffset>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Appointments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Appointments_Customers_CustomerId",
                        column: x => x.CustomerId,
                        principalTable: "Customers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Appointments_Stylists_StylistId",
                        column: x => x.StylistId,
                        principalTable: "Stylists",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AppointmentServices",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    AppointmentId = table.Column<int>(type: "integer", nullable: false),
                    ServiceId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AppointmentServices", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AppointmentServices_Appointments_AppointmentId",
                        column: x => x.AppointmentId,
                        principalTable: "Appointments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AppointmentServices_Services_ServiceId",
                        column: x => x.ServiceId,
                        principalTable: "Services",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Customers",
                columns: new[] { "Id", "Email", "Name" },
                values: new object[,]
                {
                    { 1, "angeliglegias@gmail.com", "Angel Iglesias" },
                    { 2, "blestrange@gmail.com", "Beatrice LeStrange" },
                    { 3, "rtyler@gmail.com", "Reed Tyler" },
                    { 4, "gholland@gmail.com", "Grant Holland" },
                    { 5, "bweller@gmail.com", "Bruce Weller" },
                    { 6, "mvereen@gmail.com", "Margot Vereen" },
                    { 7, "pquantz@gmail.com", "Petunia Quantz" },
                    { 8, "snguyen@gmail.com", "Sammy Nguyen" },
                    { 9, "bhezberdeen@gmail.com", "Bianca Hezberdeen" },
                    { 10, "cmichaels@gmail.com", "Clint Michaels" }
                });

            migrationBuilder.InsertData(
                table: "Services",
                columns: new[] { "Id", "Name", "Price" },
                values: new object[,]
                {
                    { 1, "Haircut", 20m },
                    { 2, "Keratin Treatment", 40m },
                    { 3, "Beard/Eyebrow Shaping", 10m },
                    { 4, "Hair Coloring", 60m },
                    { 5, "Formal Styling", 50m }
                });

            migrationBuilder.InsertData(
                table: "Stylists",
                columns: new[] { "Id", "Bio", "Email", "ImgUrl", "IsActive", "Name" },
                values: new object[,]
                {
                    { 1, "Violet has been a hair stylist for 5 years, 2 of them here at Hillary's. Violet loves to build strong connections and trust with her clients.", "violetb@gmail.com", "https://images.pexels.com/photos/2805050/pexels-photo-2805050.jpeg?auto=compress&cs=tinysrgb&w=800", true, "Violet Blankenship" },
                    { 2, "Hillary is not only a stylist but has been owner-operate of Hillary's Hair Care for 6 years. Her business is thriving and all of her customers don't mind waiting to get in with her! Make your appointment soon!", "hillaryr@gmail.com", "https://images.pexels.com/photos/3021554/pexels-photo-3021554.jpeg?auto=compress&cs=tinysrgb&w=800", true, "Hillary Reed" },
                    { 3, "Lisa is a long time stylist, with experience in many services and styling practices. Although she is our newest stylist, she is already building a strong network of clients!", "lisat@gmail.com", "https://images.pexels.com/photos/654696/pexels-photo-654696.jpeg?auto=compress&cs=tinysrgb&w=800", true, "Lisa Tomas" },
                    { 4, "Nate was the first stylist hired on my Hillary when she decided to open her own salon. They have been best friends since high school, and fell in love with styling together. Nate loves staying on top of the hottest new trends, and would love to add you to his long list of regulars. ", "natev@gmail.com", "https://images.pexels.com/photos/2531553/pexels-photo-2531553.jpeg?auto=compress&cs=tinysrgb&w=800", true, "Nate Vissel" },
                    { 5, "Victoria is a personable and high energy stylist who loves treating her clients like royalty. With several years of experience working with many hair types and styles, if in doubt, she's the stylist for you!", "victorad@gmail.com", "https://images.pexels.com/photos/3108924/pexels-photo-3108924.jpeg?auto=compress&cs=tinysrgb&w=800", false, "Victoria Byron" }
                });

            migrationBuilder.InsertData(
                table: "Appointments",
                columns: new[] { "Id", "CustomerId", "Date", "StylistId" },
                values: new object[,]
                {
                    { 1, 1, new DateTimeOffset(new DateTime(2024, 1, 4, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 2 },
                    { 2, 3, new DateTimeOffset(new DateTime(2024, 1, 15, 13, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 1 },
                    { 3, 5, new DateTimeOffset(new DateTime(2024, 2, 22, 9, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 3 },
                    { 4, 2, new DateTimeOffset(new DateTime(2024, 1, 16, 16, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 4 },
                    { 5, 8, new DateTimeOffset(new DateTime(2024, 2, 5, 11, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 1 },
                    { 6, 10, new DateTimeOffset(new DateTime(2024, 2, 18, 9, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 1 },
                    { 7, 6, new DateTimeOffset(new DateTime(2024, 1, 3, 13, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 3 },
                    { 8, 4, new DateTimeOffset(new DateTime(2024, 2, 19, 15, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 2 },
                    { 9, 7, new DateTimeOffset(new DateTime(2024, 2, 27, 17, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 4 },
                    { 10, 10, new DateTimeOffset(new DateTime(2024, 1, 20, 10, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, -6, 0, 0, 0)), 1 }
                });

            migrationBuilder.InsertData(
                table: "AppointmentServices",
                columns: new[] { "Id", "AppointmentId", "ServiceId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 3 },
                    { 3, 2, 2 },
                    { 4, 2, 4 },
                    { 5, 3, 1 },
                    { 6, 3, 5 },
                    { 7, 4, 2 },
                    { 8, 4, 3 },
                    { 9, 5, 4 },
                    { 10, 5, 5 },
                    { 11, 6, 1 },
                    { 12, 7, 1 },
                    { 13, 8, 2 },
                    { 14, 9, 1 },
                    { 15, 9, 3 },
                    { 16, 10, 1 },
                    { 17, 10, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_CustomerId",
                table: "Appointments",
                column: "CustomerId");

            migrationBuilder.CreateIndex(
                name: "IX_Appointments_StylistId",
                table: "Appointments",
                column: "StylistId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentServices_AppointmentId",
                table: "AppointmentServices",
                column: "AppointmentId");

            migrationBuilder.CreateIndex(
                name: "IX_AppointmentServices_ServiceId",
                table: "AppointmentServices",
                column: "ServiceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AppointmentServices");

            migrationBuilder.DropTable(
                name: "Appointments");

            migrationBuilder.DropTable(
                name: "Services");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropTable(
                name: "Stylists");
        }
    }
}
