using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddsPostReviewEdits : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HumansInfected",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "HumansMortality",
                table: "Reports");

            migrationBuilder.RenameColumn(
                name: "Zoonotic",
                table: "Diseases",
                newName: "IsZoonotic");

            migrationBuilder.AddColumn<int>(
                name: "Dead",
                table: "Reports",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "ReportSubmissionComments",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "CountryId",
                table: "ParaProfessionals",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CountryId",
                table: "NotificationRecipients",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<long>(
                name: "CountryId",
                table: "Institutions",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.AddColumn<bool>(
                name: "IsPriority",
                table: "Diseases",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "ResultConfirmationDate",
                table: "DiagnosticTests",
                type: "datetime2",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "TestResultFileId",
                table: "DiagnosticTests",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateTable(
                name: "Files",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FileName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    FilePath = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UploadTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RefId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Files", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ParaProfessionals_CountryId",
                table: "ParaProfessionals",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_NotificationRecipients_CountryId",
                table: "NotificationRecipients",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_Institutions_CountryId",
                table: "Institutions",
                column: "CountryId");

            migrationBuilder.CreateIndex(
                name: "IX_DiagnosticTests_TestResultFileId",
                table: "DiagnosticTests",
                column: "TestResultFileId");

            migrationBuilder.AddForeignKey(
                name: "FK_DiagnosticTests_Files_TestResultFileId",
                table: "DiagnosticTests",
                column: "TestResultFileId",
                principalTable: "Files",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Institutions_Countries_CountryId",
                table: "Institutions",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_NotificationRecipients_Countries_CountryId",
                table: "NotificationRecipients",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ParaProfessionals_Countries_CountryId",
                table: "ParaProfessionals",
                column: "CountryId",
                principalTable: "Countries",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DiagnosticTests_Files_TestResultFileId",
                table: "DiagnosticTests");

            migrationBuilder.DropForeignKey(
                name: "FK_Institutions_Countries_CountryId",
                table: "Institutions");

            migrationBuilder.DropForeignKey(
                name: "FK_NotificationRecipients_Countries_CountryId",
                table: "NotificationRecipients");

            migrationBuilder.DropForeignKey(
                name: "FK_ParaProfessionals_Countries_CountryId",
                table: "ParaProfessionals");

            migrationBuilder.DropTable(
                name: "Files");

            migrationBuilder.DropIndex(
                name: "IX_ParaProfessionals_CountryId",
                table: "ParaProfessionals");

            migrationBuilder.DropIndex(
                name: "IX_NotificationRecipients_CountryId",
                table: "NotificationRecipients");

            migrationBuilder.DropIndex(
                name: "IX_Institutions_CountryId",
                table: "Institutions");

            migrationBuilder.DropIndex(
                name: "IX_DiagnosticTests_TestResultFileId",
                table: "DiagnosticTests");

            migrationBuilder.DropColumn(
                name: "Dead",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ReportSubmissionComments",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "ParaProfessionals");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "NotificationRecipients");

            migrationBuilder.DropColumn(
                name: "CountryId",
                table: "Institutions");

            migrationBuilder.DropColumn(
                name: "IsPriority",
                table: "Diseases");

            migrationBuilder.DropColumn(
                name: "ResultConfirmationDate",
                table: "DiagnosticTests");

            migrationBuilder.DropColumn(
                name: "TestResultFileId",
                table: "DiagnosticTests");

            migrationBuilder.RenameColumn(
                name: "IsZoonotic",
                table: "Diseases",
                newName: "Zoonotic");

            migrationBuilder.AddColumn<int>(
                name: "HumansInfected",
                table: "Reports",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "HumansMortality",
                table: "Reports",
                type: "int",
                nullable: true);
        }
    }
}
