using System.Linq.Expressions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Analytics;
using RegionalAnimalHealth.Domain.Entities.Reports;

namespace RegionalAnimalHealth.Application.Contracts.Reports.Queries.GetReportsAnalytics;
public class GetReportsAnalyticsQuery : IRequest<(Result, ReportsAnalyticsDto)>
{
    public DataQueryTimeSpan TimeSpan { get; set; }
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
            var (start, end) = GetQuerySpan(seriesType, request.TimeSpan);

            var reports = await _context.Reports
                .Where(x => !x.IsDeleted && x.Created.Date >= start && x.Created.Date <= end)
                .OrderBy(x => x.Created)
                .ToListAsync();

            chartData.Total = reports.Count();
            chartData.Verified = reports.Where(x => x.IsVerified).Count();
            chartData.Unverified = reports.Where(x => !x.IsVerified).Count();
            chartData.Notified = reports.Where(x => x.IsNotified && x.NotificationSent.Date >= start && x.NotificationSent.Date <= end).Count();

            var dataPoints = new List<DataPoint>();
            while (start < end)
            {
                dataPoints.Add(new DataPoint { Date = DateOnly.FromDateTime(start).ToShortDateString(), Value = reports.Where(x => x.Created.Date == start).Count() });
                start = start.AddDays(1);
            }

            chartData.Name = seriesType.ToString();
            chartData.DataPoints = dataPoints;


            return (Result.Success(), chartData);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, ex.Message);
            return (Result.Failure(new List<string> { ex.Message }), chartData);
        }
    }

    private (DateTime start, DateTime end) GetQuerySpan(DataSeriesType seriesType, DataQueryTimeSpan timeSpan)
    {
        switch (seriesType)
        {
            case DataSeriesType.Days:
            default:
                var end = DateTime.UtcNow.AddDays(1).Date;
                var start = end.AddDays(-7).Date;
                
                return (start, end);
        }
    }

    private DataSeriesType GetSeriesType(DataQueryTimeSpan timeSpan)
    {
        switch (timeSpan)
        {
            case DataQueryTimeSpan.PastMonth:
            case DataQueryTimeSpan.ThisMonth:
                return DataSeriesType.Weeks;
            case DataQueryTimeSpan.ThisWeek:
            case DataQueryTimeSpan.LastWeek:
            default:
                return DataSeriesType.Days;
        }
    }
}
