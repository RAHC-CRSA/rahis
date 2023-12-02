using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddReportStatus : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ReportStatus",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReportStatus",
                table: "Reports");
        }
    }
}
