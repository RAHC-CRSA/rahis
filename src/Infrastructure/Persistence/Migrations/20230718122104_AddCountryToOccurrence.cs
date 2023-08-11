using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddCountryToOccurrence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CountryId",
                table: "Occurrences",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_Occurrences_CountryId",
                table: "Occurrences",
                column: "CountryId");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurrences_Countries_CountryId",
                table: "Occurrences",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Occurrences_Countries_CountryId",
                table: "Occurrences");

            migrationBuilder.DropIndex(
                name: "IX_Occurrences_CountryId",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Occurrences");
        }
    }
}
