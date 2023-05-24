using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddPropsToReports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiagnosticTests_Institutions_InstitutionId",
                table: "DiagnosticTests");

            migrationBuilder.DropForeignKey(
                name: "FK_Vaccinations_Diseases_DiseaseId",
                table: "Vaccinations");

            migrationBuilder.DropIndex(
                name: "IX_Vaccinations_DiseaseId",
                table: "Vaccinations");

            migrationBuilder.DropIndex(
                name: "IX_DiagnosticTests_InstitutionId",
                table: "DiagnosticTests");

            migrationBuilder.DropColumn(
                name: "DiseaseId",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "MedicationAdministered",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "MedicationDosage",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "DiagnosticTests");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DiseaseId",
                table: "Vaccinations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<string>(
                name: "MedicationAdministered",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MedicationDosage",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "InstitutionId",
                table: "DiagnosticTests",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_DiseaseId",
                table: "Vaccinations",
                column: "DiseaseId");

            migrationBuilder.CreateIndex(
                name: "IX_DiagnosticTests_InstitutionId",
                table: "DiagnosticTests",
                column: "InstitutionId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiagnosticTests_Institutions_InstitutionId",
                table: "DiagnosticTests",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccinations_Diseases_DiseaseId",
                table: "Vaccinations",
                column: "DiseaseId",
                principalTable: "Diseases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
