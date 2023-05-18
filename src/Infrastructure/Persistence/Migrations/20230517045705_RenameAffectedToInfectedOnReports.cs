using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class RenameAffectedToInfectedOnReports : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "NumberAffected",
                table: "Reports",
                newName: "NumberInfected");

            migrationBuilder.CreateTable(
                name: "VaccinationTypes",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RefId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VaccinationTypes", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reports_DiseaseId",
                table: "Reports",
                column: "DiseaseId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Diseases_DiseaseId",
                table: "Reports",
                column: "DiseaseId",
                principalTable: "Diseases",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Diseases_DiseaseId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "VaccinationTypes");

            migrationBuilder.DropIndex(
                name: "IX_Reports_DiseaseId",
                table: "Reports");

            migrationBuilder.RenameColumn(
                name: "NumberInfected",
                table: "Reports",
                newName: "NumberAffected");
        }
    }
}
