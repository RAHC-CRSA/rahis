using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddsReportFieldsAndMedications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Vaccinations_Institutions_InstitutionId",
                table: "Vaccinations");

            migrationBuilder.DropTable(
                name: "DiagnosticTestTypes");

            migrationBuilder.DropTable(
                name: "VaccinationTypes");

            migrationBuilder.DropIndex(
                name: "IX_Vaccinations_InstitutionId",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "InstitutionId",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "VaccinationTypeId",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "PublicSector",
                table: "ParaProfessionals");

            migrationBuilder.DropColumn(
                name: "DiagnosticTestTypeId",
                table: "DiagnosticTests");

            migrationBuilder.RenameColumn(
                name: "Type",
                table: "ParaProfessionals",
                newName: "Position");

            migrationBuilder.AddColumn<bool>(
                name: "IsAnimal",
                table: "Vaccinations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "IsHuman",
                table: "Vaccinations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "Vaccinations",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "CorpsesDestroyed",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HumanInfection",
                table: "Reports",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "HumansExposed",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HumansInfected",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "HumansMortality",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.AddColumn<string>(
                name: "MovementControlMeasures",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ObservationDuration",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "QuarantineDuration",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "ParaProfessionals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "ParaProfessionals",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "DiagnosticTests",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Medications",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Dosage = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ReportId = table.Column<long>(type: "bigint", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RefId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Medications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Medications_Reports_ReportId",
                        column: x => x.ReportId,
                        principalTable: "Reports",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Medications_ReportId",
                table: "Medications",
                column: "ReportId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Medications");

            migrationBuilder.DropColumn(
                name: "IsAnimal",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "IsHuman",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "CorpsesDestroyed",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "HumanInfection",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "HumansExposed",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "HumansInfected",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "HumansMortality",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "MedicationAdministered",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "MedicationDosage",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "MovementControlMeasures",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ObservationDuration",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "QuarantineDuration",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "Email",
                table: "ParaProfessionals");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "ParaProfessionals");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "DiagnosticTests");

            migrationBuilder.RenameColumn(
                name: "Position",
                table: "ParaProfessionals",
                newName: "Type");

            migrationBuilder.AddColumn<long>(
                name: "InstitutionId",
                table: "Vaccinations",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "VaccinationTypeId",
                table: "Vaccinations",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<bool>(
                name: "PublicSector",
                table: "ParaProfessionals",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<long>(
                name: "DiagnosticTestTypeId",
                table: "DiagnosticTests",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "DiagnosticTestTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DiagnosticTestTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "VaccinationTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RefId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VaccinationTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_InstitutionId",
                table: "Vaccinations",
                column: "InstitutionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccinations_Institutions_InstitutionId",
                table: "Vaccinations",
                column: "InstitutionId",
                principalTable: "Institutions",
                principalColumn: "Id");
        }
    }
}
