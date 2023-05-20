        using System.Linq.Expressions;
        using MediatR;
        using Microsoft.EntityFrameworkCore;
        using Microsoft.Extensions.Logging;
        using RegionalAnimalHealth.Application.Common.Interfaces;
using RegionalAnimalHealth.Application.Common.Models;
using RegionalAnimalHealth.Application.Common.Models.Regions;
        using RegionalAnimalHealth.Domain.Entities.Regions;
        using RegionalAnimalHealth.Domain.Exceptions;

        namespace RegionalAnimalHealth.Application.Contracts.Regions.Queries.GetCountries;
        public class GetCountriesQuery : IRequest<(Result, List<CountryDto>?)>
        {
        }

        public class GetCountriesQueryHandler : IRequestHandler<GetCountriesQuery, (Result, List<CountryDto>?)>
        {
            private readonly IApplicationDbContext _context;
            private readonly ILogger<GetCountriesQuery> _logger;

            public GetCountriesQueryHandler(IApplicationDbContext context, ILogger<GetCountriesQuery> logger)
            {
                _context = context;
                _logger = logger;
            }

            public async Task<(Result, List<CountryDto>?)> Handle(GetCountriesQuery request, CancellationToken cancellationToken)
            {
                try
                {
                    var countries = await _context.Countries
                        .Include(x => x.Regions.Where(r => !r.IsDeleted))
                        .Where(x => !x.IsDeleted)
                        .Select(CountrySelectorExpression())
                        .ToListAsync();

                    return (Result.Success(), countries);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex.Message);
                    return (Result.Failure(new List<string> { ex.Message }), null);
                }
            }

            private Expression<Func<Country, CountryDto>> CountrySelectorExpression()
            {
                return e => new CountryDto
                {
                    Id = e.Id,
                    Name = e.Name,
                    Code = e.Code,
                    Flag = e.Flag,
                    Regions = e.Regions.Count
                };
            }
        }
