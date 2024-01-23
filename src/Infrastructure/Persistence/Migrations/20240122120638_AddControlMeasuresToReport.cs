using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddControlMeasuresToReport : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ReportSubmissionComments",
                table: "Reports");

            migrationBuilder.AddColumn<long>(
                name: "ControlMeasureId",
                table: "Reports",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ControlMeasures",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Code = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RefId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LastModified = table.Column<DateTime>(type: "datetime2", nullable: true),
                    LastModifiedBy = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ControlMeasures", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Reports_ControlMeasureId",
                table: "Reports",
                column: "ControlMeasureId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_ControlMeasures_ControlMeasureId",
                table: "Reports",
                column: "ControlMeasureId",
                principalTable: "ControlMeasures",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reports_ControlMeasures_ControlMeasureId",
                table: "Reports");

            migrationBuilder.DropTable(
                name: "ControlMeasures");

            migrationBuilder.DropIndex(
                name: "IX_Reports_ControlMeasureId",
                table: "Reports");

            migrationBuilder.DropColumn(
                name: "ControlMeasureId",
                table: "Reports");

            migrationBuilder.AddColumn<string>(
                name: "ReportSubmissionComments",
                table: "Reports",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
