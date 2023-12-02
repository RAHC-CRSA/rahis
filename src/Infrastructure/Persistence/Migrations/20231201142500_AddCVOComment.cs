using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCVOComment : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CvoComment",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CvoComment",
                table: "Reports");
        }
    }
}
