using MediatR;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportById;
public class GetReportByIdQuery : IRequest<(Result, ReportDto?)>
{
    public long ReportId { get; set; }
}
