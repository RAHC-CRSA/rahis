using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Analytics;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportsAnalytics;
public class GetReportsAnalyticsQuery : IRequest<(Result, ReportsAnalyticsDto)>
{
    public DataQueryTimeSpan TimeSpan { get; set; }
    public long? CountryId { get; set; }
}

public class GetReportsChartDataQueryHandler : IRequestHandler<GetReportsAnalyticsQuery, (Result, ReportsAnalyticsDto)>
{
    private readonly IApplicationDbContext _context;
    private readonly ILogger<GetReportsAnalyticsQuery> _logger;

    public GetReportsChartDataQueryHandler(IApplicationDbContext context, ILogger<GetReportsAnalyticsQuery> logger)
    {
        _context = context;
        _logger = logger;
    }

    public async Task<(Result, ReportsAnalyticsDto)> Handle(GetReportsAnalyticsQuery request, CancellationToken cancellationToken)
    {
        ReportsAnalyticsDto chartData = new();
        try
        {
            var seriesType = GetSeriesType(request.TimeSpan);
            var (start, end, format, series) = GetQuerySpan(seriesType, request.TimeSpan);

            var reports = await _context.Reports
                .Where(x => !x.IsDeleted && x.Created.Date >= start && x.Created.Date <= end && (request.CountryId != null ? x.Occurrence.CountryId == request.CountryId : true))
                .OrderBy(x => x.Created)
                .ToListAsync();

            chartData.Total = reports.Count();
            chartData.Verified = reports.Where(x => x.IsVerified).Count();
            chartData.Unverified = reports.Where(x => !x.IsVerified).Count();
            chartData.Notified = reports.Where(x => x.IsNotified && x.NotificationSent.Date >= start && x.NotificationSent.Date <= end).Count();

            var dataPoints = new List<DataPoint>();
            while (start < end)
            {
                dataPoints.Add(new DataPoint { Value = reports.Where(x => x.Created.Date == start).Count(), Date = start });
                start = start.AddDays(1);
            }

            chartData.Name = series;
            chartData.DataPoints = dataPoints;


            return (Result.Success(), chartData);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), chartData);
        }
    }

    private (DateTime start, DateTime end, string format, string series) GetQuerySpan(DataSeriesType seriesType, DataQueryTimeSpan timeSpan)
    {
        DateTime start;
        DateTime end;
        string format;
        string series;

        switch (seriesType)
        {
            case DataSeriesType.Year:
                start = DateTime.UtcNow.Date.AddYears(-1);
                end = DateTime.UtcNow.Date.AddDays(1).AddMicroseconds(-1);
                format = "dd/MM/yyyy";
                series = "Past Year";

                break;
            case DataSeriesType.Month:
                start = DateTime.UtcNow.Date.AddMonths(-1);
                end = DateTime.UtcNow.Date.AddDays(1).AddMicroseconds(-1);
                format = "dd MMM";
                series = "Past Month";

                break;
            case DataSeriesType.Week:
            default:
                start = DateTime.UtcNow.Date.AddDays(-7);
                end = DateTime.UtcNow.Date.AddDays(1).AddMicroseconds(-1);
                format = "ddd, dd";
                series = "Past Week";

                break;
        }

        return (start, end, format, series);
    }

    private DataSeriesType GetSeriesType(DataQueryTimeSpan timeSpan)
    {
        switch (timeSpan)
        {
            case DataQueryTimeSpan.PastYear:
                return DataSeriesType.Year;
            case DataQueryTimeSpan.PastMonth:
                return DataSeriesType.Month;
            case DataQueryTimeSpan.PastWeek:
            default:
                return DataSeriesType.Week;
        }
    }
}
