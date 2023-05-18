using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddDatesToOccurrence : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateEnded",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "DateStarted",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "DiagnosticTestId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "RegionId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "VaccinationId",
                table: "Reports");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Vaccinations",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Vaccinations",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Species",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Species",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AlterColumn<long>(
                name: "OccurenceId",
                table: "Reports",
                type: "bigint",
                nullable: true,
                oldClrType: typeof(long),
                oldType: "bigint");

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Reports",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Reports",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Reports",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Reports",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Regions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Regions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "ParaProfessionals",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "ParaProfessionals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateEnded",
                table: "Occurrences",
                type: "date",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateStarted",
                table: "Occurrences",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Occurrences",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Occurrences",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Institutions",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Institutions",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Diseases",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Diseases",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "DiagnosticTests",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "DiagnosticTests",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<bool>(
                name: "IsDeleted",
                table: "Countries",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<Guid>(
                name: "RefId",
                table: "Countries",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Vaccinations_ReportId",
                table: "Vaccinations",
                column: "ReportId");

            migrationBuilder.CreateIndex(
                name: "IX_DiagnosticTests_ReportId",
                table: "DiagnosticTests",
                column: "ReportId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiagnosticTests_Reports_ReportId",
                table: "DiagnosticTests",
                column: "ReportId",
                principalTable: "Reports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Vaccinations_Reports_ReportId",
                table: "Vaccinations",
                column: "ReportId",
                principalTable: "Reports",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiagnosticTests_Reports_ReportId",
                table: "DiagnosticTests");

            migrationBuilder.DropForeignKey(
                name: "FK_Vaccinations_Reports_ReportId",
                table: "Vaccinations");

            migrationBuilder.DropIndex(
                name: "IX_Vaccinations_ReportId",
                table: "Vaccinations");

            migrationBuilder.DropIndex(
                name: "IX_DiagnosticTests_ReportId",
                table: "DiagnosticTests");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Vaccinations");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Species");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Regions");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Regions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "ParaProfessionals");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "ParaProfessionals");

            migrationBuilder.DropColumn(
                name: "DateEnded",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "DateStarted",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Diseases");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Diseases");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "DiagnosticTests");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "DiagnosticTests");

            migrationBuilder.DropColumn(
                name: "IsDeleted",
                table: "Countries");

            migrationBuilder.DropColumn(
                name: "RefId",
                table: "Countries");

            migrationBuilder.AlterColumn<long>(
                name: "OccurenceId",
                table: "Reports",
                type: "bigint",
                nullable: false,
                defaultValue: 0L,
                oldClrType: typeof(long),
                oldType: "bigint",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Reports",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Reports",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "DateEnded",
                table: "Reports",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "DateStarted",
                table: "Reports",
                type: "date",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<long>(
                name: "DiagnosticTestId",
                table: "Reports",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "RegionId",
                table: "Reports",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "VaccinationId",
                table: "Reports",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);
        }
    }
}
