using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddTransDiseasesToOccurrence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NotifiabilityPoints",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<long>(
                name: "TransboundaryDiseaseId",
                table: "Occurrences",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsMonitored",
                table: "Diseases",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsNotifiable",
                table: "Diseases",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Occurrences_TransboundaryDiseaseId",
                table: "Occurrences",
                column: "TransboundaryDiseaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurrences_TransboundaryDiseases_TransboundaryDiseaseId",
                table: "Occurrences",
                column: "TransboundaryDiseaseId",
                principalTable: "TransboundaryDiseases",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Occurrences_TransboundaryDiseases_TransboundaryDiseaseId",
                table: "Occurrences");

            migrationBuilder.DropIndex(
                name: "IX_Occurrences_TransboundaryDiseaseId",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "NotifiabilityPoints",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "TransboundaryDiseaseId",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "IsMonitored",
                table: "Diseases");

            migrationBuilder.DropColumn(
                name: "IsNotifiable",
                table: "Diseases");
        }
    }
}
