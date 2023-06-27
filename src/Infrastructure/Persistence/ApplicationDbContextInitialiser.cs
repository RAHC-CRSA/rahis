using System.Globalization;
using System.Reflection;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using RegionalAnimalHealth.Application.Common.Security;
using RegionalAnimalHealth.Domain.Entities.Regions;
using RegionalAnimalHealth.Domain.Entities.Reports;
using RegionalAnimalHealth.Domain.Exceptions;
using RegionalAnimalHealth.Infrastructure.Identity;
using RegionalAnimalHealth.Infrastructure.Persistence.SeedData;

namespace RegionalAnimalHealth.Infrastructure.Persistence;

public class ApplicationDbContextInitialiser
{
    private readonly ILogger<ApplicationDbContextInitialiser> _logger;
    private readonly ApplicationDbContext _context;
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public ApplicationDbContextInitialiser(ILogger<ApplicationDbContextInitialiser> logger, ApplicationDbContext context, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
    {
        _logger = logger;
        _context = context;
        _userManager = userManager;
        _roleManager = roleManager;
    }

    public async Task InitialiseAsync()
    {
        try
        {
            if (_context.Database.IsSqlServer())
            {
                await _context.Database.MigrateAsync();
            }
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while initialising the database.");
            throw;
        }
    }

    public async Task SeedAsync()
    {
        try
        {
            await SeedRolesAsync();
            await SeedAdminsAsync();
            await SeedDiseasesAndSpeciesAsync();
            await SeedRegionsAsync();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while seeding the database.");
            throw;
        }
    }

    public async Task SeedRolesAsync()
    {
        var roles = new List<string>
        {
            SecurityRoles.SuperAdmin,
            SecurityRoles.Admin,
            SecurityRoles.Verifier,
            SecurityRoles.Reporter,
            SecurityRoles.NotifiedUser,
            SecurityRoles.ApiUser
        };

        if (!_roleManager.Roles.Any())
        {
            foreach (var role in roles)
                await _roleManager.CreateAsync(new IdentityRole(role));
        }
    }

    public async Task SeedAdminsAsync()
    {
        if (!_userManager.Users.Any())
        {
            // Default roles
            var administratorRole = new IdentityRole(SecurityRoles.SuperAdmin);

            if (_roleManager.Roles.All(r => r.Name != administratorRole.Name))
            {
                await _roleManager.CreateAsync(administratorRole);
            }

            // Default users
            var administrator = new ApplicationUser
            {
                UserName = "admin@rahis.io",
                Email = "admin@rahis.io",
                FirstName = "Super",
                LastName = "Admin" +
                ""
            };

            if (_userManager.Users.All(u => u.UserName != administrator.UserName))
            {
                await _userManager.CreateAsync(administrator, "Admin321!");
                if (!string.IsNullOrWhiteSpace(administratorRole.Name))
                {
                    await _userManager.AddToRolesAsync(administrator, new[] { administratorRole.Name });
                }
            }
        }
    }

    public async Task SeedDiseasesAndSpeciesAsync()
    {
        if (!_context.Diseases.Any())
        {
            try
            {
                var classification = string.Empty;
                var transboundaryDiseases = new List<TransboundaryDisease>();

                // Common diseases
                classification = "Common Diseases";

                var commonSpecies = Species.Create("Common");
                var commonDiseases = new List<Disease>
                {
                    Disease.Create("Foot-and-mouth disease", "", classification),
                    Disease.Create("Rift Valley fever", "", classification),
                    Disease.Create("Q fever", "", classification),
                    Disease.Create("Rabies", "", classification, true),
                    Disease.Create("Heartwater", "", classification),
                    Disease.Create("Anthrax", "", classification, true),
                    Disease.Create("Dermatophilosis", "", classification),
                    Disease.Create("Nodular contagious dermatosis", "", classification),
                    Disease.Create("Highly pathogenic avian influenza", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(commonSpecies);
                await _context.Diseases.AddRangeAsync(commonDiseases);

                // Bovidae diseases
                classification = "Bovidae Diseases";

                var bovidaeSpecies = Species.Create("Bovidae");
                var bovidaeDiseases = new List<Disease>
                {
                    Disease.Create("Blackleg", "", classification),
                    Disease.Create("Rinderpest", "", classification),
                    Disease.Create("Contagious bovine pleuropneumonia", "", classification),
                    Disease.Create("Bovine tuberculosis", "", classification),
                    Disease.Create("Cattle gangrenous coryza", "", classification),
                    Disease.Create("Enzootic bovine leukosis", "", classification),
                    Disease.Create("Septicaemic pasteurellosis of bovids", "", classification),
                    Disease.Create("Bovine brucellosis", "", classification),
                    Disease.Create("Bovine actinobacillosis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(bovidaeSpecies);
                await _context.Diseases.AddRangeAsync(bovidaeDiseases);

                // Lagomorphs diseases
                classification = "Lagomorphs diseases";

                var lagomorphsSpecies = Species.Create("Lagomorphs");
                var lagomorphsDiseases = new List<Disease>
                {
                    Disease.Create("Myxomatosis", "", classification),
                    Disease.Create("Tularemia", "", classification),
                    Disease.Create("Viral hemorrhagic disease of rabbits", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(lagomorphsSpecies);
                await _context.Diseases.AddRangeAsync(lagomorphsDiseases);

                // Sheep and goats diseases
                classification = "Sheep and goats diseases";

                var sheepAndGoatsSpecies = Species.Create("Sheep and Goats");
                var sheepAndGoatsDiseases = new List<Disease>
                {
                    Disease.Create("Ovine brucellosis", "", classification),
                    Disease.Create("Ovine and caprine brucellosis", "", classification),
                    Disease.Create("Peste des petits ruminants", "", classification),
                    Disease.Create("Pasteurellosis of small ruminants", "", classification),
                    Disease.Create("Grassy", "", classification),
                    Disease.Create("Goat pox", "", classification),
                    Disease.Create("Contagious pleuropneumonia of small ruminants", "", classification),
                    Disease.Create("Chlamydia", "", classification),
                    Disease.Create("Salmonellosis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(sheepAndGoatsSpecies);
                await _context.Diseases.AddRangeAsync(sheepAndGoatsDiseases);

                // Equine diseases
                classification = "Equine diseases";

                var equineSpecies = Species.Create("Equine");
                var equineDiseases = new List<Disease>
                {
                    Disease.Create("African horse sickness", "", classification),
                    Disease.Create("Dourine", "", classification),
                    Disease.Create("Epizootic lymphangitis", "", classification),
                    Disease.Create("Enzootic meningoencephomyelitis of equidae", "", classification),
                    Disease.Create("Equine infectious anaemia", "", classification),
                    Disease.Create("Snot", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(equineSpecies);
                await _context.Diseases.AddRangeAsync(equineDiseases);

                // Pigs diseases
                classification = "Pigs diseases";

                var pigsSpecies = Species.Create("Pigs");
                var pigsDiseases = new List<Disease>
                {
                    Disease.Create("Classical swine fever", "", classification),
                    Disease.Create("African swine fever", "", classification),
                    Disease.Create("Porcine brucellosis", "", classification),
                    Disease.Create("Pork mullet", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(pigsSpecies);
                await _context.Diseases.AddRangeAsync(pigsDiseases);

                // Fish diseases
                classification = "Fish diseases";

                var fishSpecies = Species.Create("Fish");
                var fishDiseases = new List<Disease>
                {
                    Disease.Create("Yersiniosis", "", classification),
                    Disease.Create("Herpesvirus disease", "", classification),
                    Disease.Create("Pseudomonosis", "", classification),
                    Disease.Create("Tilapia Lake virus", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(fishSpecies);
                await _context.Diseases.AddRangeAsync(fishDiseases);

                // Poultry diseases
                classification = "Poultry diseases";

                var poultrySpecies = Species.Create("Poultry");
                var poultryDiseases = new List<Disease>
                {
                    Disease.Create("Avian typhoid", "", classification),
                    Disease.Create("Highly pathogenic avian infl uenza", "", classification),
                    Disease.Create("Newcastle disease", "", classification),
                    Disease.Create("Fowan pullorosis", "", classification),
                    Disease.Create("Fowl cholera", "", classification),
                    Disease.Create("Fowlpox", "", classification),
                    Disease.Create("Mycoplasmosis", "", classification),
                    Disease.Create("Avian adenorosis", "", classification),
                    Disease.Create("Gumboro disease", "", classification),
                    Disease.Create("Psittacosis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(poultrySpecies);
                await _context.Diseases.AddRangeAsync(poultryDiseases);

                // Bee diseases
                classification = "Bee diseases";

                var beesSpecies = Species.Create("Bees");
                var beesDiseases = new List<Disease>
                {
                    Disease.Create("Acariosis of bees", "", classification),
                    Disease.Create("American foulbrood", "", classification),
                    Disease.Create("European foulbrood", "", classification),
                    Disease.Create("Nosemosis of bees", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(beesSpecies);
                await _context.Diseases.AddRangeAsync(beesDiseases);

                await _context.SaveChangesAsync();

                // Create transboundary diseases
                foreach (var disease in commonDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, commonSpecies.Id));

                foreach (var disease in bovidaeDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, bovidaeSpecies.Id));

                foreach (var disease in lagomorphsDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, lagomorphsSpecies.Id));

                foreach (var disease in sheepAndGoatsDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, sheepAndGoatsSpecies.Id));

                foreach (var disease in equineDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, equineSpecies.Id));

                foreach (var disease in pigsDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, pigsSpecies.Id));

                foreach (var disease in fishDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, fishSpecies.Id));

                foreach (var disease in poultryDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, poultrySpecies.Id));

                foreach (var disease in beesDiseases)
                    transboundaryDiseases.Add(TransboundaryDisease.Create(disease.Id, beesSpecies.Id));

                await _context.TransboundaryDiseases.AddRangeAsync(transboundaryDiseases);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new BusinessRuleException("DbInitialiser", ex.Message ?? "Error occured while seeding diseases.");
            }
        }
    }

    public async Task SeedSpeciesAsync()
    {
        if (!_context.Species.Any())
        {
            try
            {
                var species = new List<Species>();
                species.AddRange(new List<Species> {
                    Species.Create("Common"),
                    Species.Create("Bovidae"),
                    Species.Create("Lagomorphs"),
                    Species.Create("Sheep and Goats"),
                    Species.Create("Equine"),
                    Species.Create("Pigs"),
                    Species.Create("Fish"),
                    Species.Create("Poultry"),
                    Species.Create("Bees"),
                });

                species = species.OrderBy(e => e.Name).ToList();
                await _context.Species.AddRangeAsync(species);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new BusinessRuleException("DbInitializer", ex.Message ?? "Error occured while seeding species.");
            }
        }
    }

    public async Task SeedRegionsAsync()
    {
        if (!_context.Regions.Any())
        {
            try
            {
                // Parse json into data class
                var fileName = "countryRegions.json";
                var _filePath = Path.Combine(GetRootPath(), "Infrastructure\\Persistence\\SeedData", fileName);
                var dataText = File.ReadAllText(_filePath);
                var regionSeedData = JsonConvert.DeserializeObject<List<RegionData>>(dataText);

                foreach (var country in regionSeedData)
                {
                    await SeedCountryAsync(country);

                }
            }
            catch (Exception ex)
            {
                throw new BusinessRuleException("DbInitializer", ex.Message ?? "Error occured while seeding regions.");
            }
        }
    }

    private async Task SeedCountryAsync(RegionData country)
    {
        var regions = country.Regions;
        var regionData = country.Regions.DistinctBy(r => r.Region).SelectMany(RegionsSelectorExpression(regions)).ToList();

        var countryEntry = Country.Create(country.Country, country.Code, country.Flag);        

        foreach (var region in regionData)
        {
            if (string.IsNullOrEmpty(region.Name)) continue;

            countryEntry.AddRegion(region.Name, region.Name.ToLower());
            var regionEntry = countryEntry.Regions.Where(r => r.Name == region.Name).FirstOrDefault();

            foreach (var municipality in region.Municipalities)
            {
                if (string.IsNullOrEmpty(municipality.Name)) continue;

                regionEntry?.AddMunicipality(municipality.Name);
                var municipalityEntry = regionEntry?.Municipalities.Where(m => m.Name == municipality.Name).FirstOrDefault();

                foreach (var district in municipality.Districts)
                {
                    if (string.IsNullOrEmpty(district.Name)) continue;

                    municipalityEntry?.AddDistrict(district.Name);
                    var districtEntry = municipalityEntry?.Districts.Where(d => d.Name == district.Name).FirstOrDefault();

                    foreach (var community in district.Communities)
                    {
                        if (string.IsNullOrEmpty(community.Name)) continue;

                        districtEntry?.AddCommunity(community.Name);
                    }
                }
            }
        }

        await _context.Countries.AddAsync(countryEntry);
        await _context.SaveChangesAsync();

    }

    private Func<RegionItem, List<RegionInsert>> RegionsSelectorExpression(List<RegionItem> regions)
    {
        var textInfo = new CultureInfo("en-UK", false).TextInfo;
        return e => regions
            .Where(x => x.Region == e.Region)
            .DistinctBy(x => x.Region)
            .Select(r => new RegionInsert
            {
                Name = !string.IsNullOrEmpty(r.Region) ? textInfo.ToTitleCase(r.Region?.ToLower()) : "",
                Municipalities = regions?.DistinctBy(r => r.Municipality).SelectMany(MunicipalitiesSelectorExpression(r.Region, regions))?.ToList()
            })
            .ToList();
    }

    private Func<RegionItem, List<MunicipalityInsert>> MunicipalitiesSelectorExpression(string region, List<RegionItem> regions)
    {
        var textInfo = new CultureInfo("en-UK", false).TextInfo;
        return e => regions
            .Where(m => m.Region == region && m.Municipality == e.Municipality)
            .DistinctBy(m => m.Municipality)
            .Select(m => new MunicipalityInsert
            {
                Name = !string.IsNullOrEmpty(e.Municipality) ? textInfo.ToTitleCase(e.Municipality?.ToLower()) : "",
                Districts = regions?.DistinctBy(m => m.District).SelectMany(DistrictsSelectorExpression(e.District, regions))?.ToList()
            })
            .ToList();
    }

    private Func<RegionItem, List<DistrictInsert>> DistrictsSelectorExpression(string municipality, List<RegionItem> regions)
    {
        var textInfo = new CultureInfo("en-UK", false).TextInfo;
        return e => regions
            .Where(d => d.Municipality == municipality && d.District == e.District)
            .DistinctBy(d => d.District)
            .Select(d => new DistrictInsert
            {
                Name = !string.IsNullOrEmpty(d.District) ? textInfo.ToTitleCase(d.District?.ToLower()) : "",
                Communities = regions?.DistinctBy(d => d.Community).SelectMany(CommunitiesSelectorExpression(e.District, regions))?.ToList()
            })
            .ToList();
    }

    private Func<RegionItem, List<CommunityInsert>> CommunitiesSelectorExpression(string district, List<RegionItem> regions)
    {
        var textInfo = new CultureInfo("en-UK", false).TextInfo;
        return e => regions
            .Where(c => c.District == district && c.Community == e.Community)
            .DistinctBy(c => c.Community)
            .Select(c => new CommunityInsert { Name = !string.IsNullOrEmpty(c.Community) ? textInfo.ToTitleCase(c.Community?.ToLower()) : "" })
            .ToList();
    }

    private string GetRootPath()
    {
        var url = Path.GetDirectoryName(Assembly.GetExecutingAssembly().GetName().CodeBase);
        var rootPath = url.Replace("\\WebUI\\bin\\Debug\\net7.0", "");
        rootPath = rootPath.Replace("file:\\", "");
        return rootPath;
    }
}
