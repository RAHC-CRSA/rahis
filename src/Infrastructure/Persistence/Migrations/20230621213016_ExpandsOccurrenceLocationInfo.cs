using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace RegionalAnimalHealth.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class ExpandsOccurrenceLocationInfo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "CommunityId",
                table: "Occurrences",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "DistrictId",
                table: "Occurrences",
                type: "bigint",
                nullable: true);

            migrationBuilder.AddColumn<long>(
                name: "MunicipalityId",
                table: "Occurrences",
                type: "bigint",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Occurrences_CommunityId",
                table: "Occurrences",
                column: "CommunityId");

            migrationBuilder.CreateIndex(
                name: "IX_Occurrences_DistrictId",
                table: "Occurrences",
                column: "DistrictId");

            migrationBuilder.CreateIndex(
                name: "IX_Occurrences_MunicipalityId",
                table: "Occurrences",
                column: "MunicipalityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurrences_Communities_CommunityId",
                table: "Occurrences",
                column: "CommunityId",
                principalTable: "Communities",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurrences_Districts_DistrictId",
                table: "Occurrences",
                column: "DistrictId",
                principalTable: "Districts",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Occurrences_Municipalities_MunicipalityId",
                table: "Occurrences",
                column: "MunicipalityId",
                principalTable: "Municipalities",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Occurrences_Communities_CommunityId",
                table: "Occurrences");

            migrationBuilder.DropForeignKey(
                name: "FK_Occurrences_Districts_DistrictId",
                table: "Occurrences");

            migrationBuilder.DropForeignKey(
                name: "FK_Occurrences_Municipalities_MunicipalityId",
                table: "Occurrences");

            migrationBuilder.DropIndex(
                name: "IX_Occurrences_CommunityId",
                table: "Occurrences");

            migrationBuilder.DropIndex(
                name: "IX_Occurrences_DistrictId",
                table: "Occurrences");

            migrationBuilder.DropIndex(
                name: "IX_Occurrences_MunicipalityId",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "CommunityId",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "DistrictId",
                table: "Occurrences");

            migrationBuilder.DropColumn(
                name: "MunicipalityId",
                table: "Occurrences");
        }
    }
}
