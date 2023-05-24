using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddInstitutionToPros : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "InstitutionId",
                table: "ParaProfessionals",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ParaProfessionals_InstitutionId",
                table: "ParaProfessionals",
                column: "InstitutionId");

            migrationBuilder.AddForeignKey(
                name: "FK_ParaProfessionals_Institutions_InstitutionId",
                table: "ParaProfessionals",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ParaProfessionals_Institutions_InstitutionId",
                table: "ParaProfessionals");

            migrationBuilder.DropIndex(
                name: "IX_ParaProfessionals_InstitutionId",
                table: "ParaProfessionals");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "ParaProfessionals");
        }
    }
}
