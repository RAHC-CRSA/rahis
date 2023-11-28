using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddsNotificationDateToReports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsNotified",
                table: "Reports",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "NotificationSent",
                table: "Reports",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsNotified",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "NotificationSent",
                table: "Reports");
        }
    }
}
