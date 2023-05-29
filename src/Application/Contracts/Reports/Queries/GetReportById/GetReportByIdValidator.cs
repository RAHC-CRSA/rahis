using FluentValidation;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportById;
public class GetReportByIdValidator : AbstractValidator<GetReportByIdQuery>
{
    public GetReportByIdValidator()
    {
        RuleFor(x => x.ReportId)
            .NotEmpty().WithMessage("Report id is required.");
    }
}
