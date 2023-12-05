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

          //--- ONLY USE WHEN YOU HAVE SEED DATA SETUP
          /// await SeedUserAsync();
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
            SecurityRoles.RahOfficer,
            SecurityRoles.ChiefVeterinaryOfficer,
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
                LastName = "Admin"
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
                classification = "Caprine Diseases";

                var commonSpecies = Species.Create("Caprine");
                var commonDiseases = new List<Disease>
                {
                    Disease.Create("Caprine arthritis/encephalitis", "", classification),
                    Disease.Create("Crimean Congo hemorrhagic fever", "", classification),
                    Disease.Create("Contagious agalactia", "", classification),
                    Disease.Create("Contagious caprine pleuropneumonia", "", classification),
                    Disease.Create("Echinococcosis", "", classification),
                    Disease.Create("Ovine chlamydiosis", "", classification),
                    Disease.Create("Peste des Petits Ruminants", "", classification),
                    Disease.Create("Theileriosis", "", classification),
                    Disease.Create("Ovine Brucellosis", "", classification),
                    Disease.Create("Salmonellosis", "", classification),
                    Disease.Create("Scrapie", "", classification),
                    Disease.Create("Sheep pox", "", classification),
                    Disease.Create("Trypanosomiasis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(commonSpecies);
                await _context.Diseases.AddRangeAsync(commonDiseases);

                // Bovidae diseases
                classification = "Bovine Diseases";

                var bovidaeSpecies = Species.Create("Bovine");
                var bovidaeDiseases = new List<Disease>
                {
                    Disease.Create("Anthrax", "", classification),
                    Disease.Create("Crimean Congo hemorrhagic fever", "", classification),
                    Disease.Create("Bluetongue Virus", "", classification),
                    Disease.Create("Bovine anaplasmosis", "", classification),
                    Disease.Create("Bovine babesiosis", "", classification),
                    Disease.Create("Bovine genital campylobacteriosis", "", classification),
                    Disease.Create("Bovine spongiform encephalopathy", "", classification),
                    Disease.Create("Bovine Trypanosomiasis", "", classification),
                    Disease.Create("Bovine Viral Diarrhoea", "", classification),
                    Disease.Create("Enzootic Bovine Leukosis", "", classification),
                    Disease.Create("Echinococcosis", "", classification),
                    Disease.Create("Haemorrhagic Septicaemia", "", classification),
                    Disease.Create("Lumpy skin disease virus", "", classification),
                    Disease.Create("Contagious Bovine Pleuropneumonia", "", classification),
                    Disease.Create("Infectious Bovine Rhinotracheitis/infectious pustular vulvovaginitis", "", classification),
                    Disease.Create("Theileriosis", "", classification),
                    Disease.Create("Trichomonosis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(bovidaeSpecies);
                await _context.Diseases.AddRangeAsync(bovidaeDiseases);

                // Lagomorphs diseases
                classification = "Leporids diseases";

                var lagomorphsSpecies = Species.Create("Leporids");
                var lagomorphsDiseases = new List<Disease>
                {
                    Disease.Create("The Myxomatosis", "", classification),
                    Disease.Create("Rabbit haemorrhagic disease", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(lagomorphsSpecies);
                await _context.Diseases.AddRangeAsync(lagomorphsDiseases);

                // Sheep and goats diseases
                classification = "Ovine";

                var sheepAndGoatsSpecies = Species.Create("Ovine");
                var sheepAndGoatsDiseases = new List<Disease>
                {
                    Disease.Create("Ovine brucellosis", "", classification),
                    Disease.Create("Ovine and caprine brucellosis", "", classification),
                    Disease.Create("Pasteurellosis of small ruminants", "", classification),
                    Disease.Create("Grassy", "", classification),
                    Disease.Create("Goat pox", "", classification),
                    Disease.Create("Contagious pleuropneumonia of small ruminants", "", classification),
                    Disease.Create("Chlamydia", "", classification),
                    Disease.Create("Salmonellosis", "", classification),
                    //
                    Disease.Create("Caprine arthritis/encephalitis", "", classification),
                    Disease.Create("Crimean Congo hemorrhagic fever", "", classification),
                    Disease.Create("Contagious agalactia", "", classification),
                    Disease.Create("Echinococcosis", "", classification),
                    Disease.Create("Ovine chlamydiosis", "", classification),
                    Disease.Create("Theileriosis", "", classification),
                    Disease.Create("Scrapie", "", classification),
                    Disease.Create("Sheep pox", "", classification),
                    Disease.Create("Trypanosomiasis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(sheepAndGoatsSpecies);
                await _context.Diseases.AddRangeAsync(sheepAndGoatsDiseases);

                // Equine diseases
                classification = "Equine diseases";

                var equineSpecies = Species.Create("Equine");
                var equineDiseases = new List<Disease>
                {
                    Disease.Create("Contagious equine metritis", "", classification),
                    Disease.Create("Dourine", "", classification),
                    Disease.Create("Equine encephalomyelitis", "", classification),
                    Disease.Create("Equine infectious anaemia", "", classification),
                    Disease.Create("Equine piroplasmosis", "", classification),
                    Disease.Create("Glanders", "", classification),
                    Disease.Create("African horse sickness ", "", classification),
                    Disease.Create("Equine rhinopneumonitis", "", classification),
                    Disease.Create("Infectious equine arteritis virus", "", classification),
                    Disease.Create("Equine influenza virus", "", classification),
                    Disease.Create("Trypanosomiasis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(equineSpecies);
                await _context.Diseases.AddRangeAsync(equineDiseases);

                // Pigs diseases
                classification = "Swine diseases";

                var pigsSpecies = Species.Create("Swine");
                var pigsDiseases = new List<Disease>
                {
                    Disease.Create("African swine fever", "", classification),
                    Disease.Create("Classical swine fever", "", classification),
                    Disease.Create("Porcine cysticercosis", "", classification),
                    Disease.Create("Nipah virus encephalitis", "", classification),
                    Disease.Create("Trypanosomiasis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(pigsSpecies);
                await _context.Diseases.AddRangeAsync(pigsDiseases);

                // Canine diseases
                classification = "Canine diseases";

                var canineSpecies = Species.Create("Canine");
                var canineDiseases = new List<Disease>
                {
                    Disease.Create("Canine distemper", "", classification),
                    Disease.Create("Canine parvovirus", "", classification),
                    Disease.Create("Canine influenza", "", classification),
                    Disease.Create("Canine adenovirus", "", classification),
                    Disease.Create("Echinococcosis", "", classification),
                    Disease.Create("Rabies", "", classification),
                    Disease.Create("Leptospirosis", "", classification),
                    Disease.Create("Lyme disease", "", classification),
                    Disease.Create("Borreliosis", "", classification),
                    Disease.Create("Kennel cough", "", classification),
                    Disease.Create("Leishmaniasis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(canineSpecies);
                await _context.Diseases.AddRangeAsync(canineDiseases);

                // Prioritized Zonotic diseases
                classification = "Prioritized Zonotic diseases";

                var zonoticSpecies = Species.Create("Zonotic");
                var zonoticDiseases = new List<Disease>
                {
                    Disease.Create("Anthrax", "", classification),
                    Disease.Create("Rabies", "", classification),
                    Disease.Create("Ebola and other Viral Haemorrhagic Fevers (Marburg, Lassa fever, Rift Valley fever, and Crimean-Congo hemorrhagic fever)", "", classification),
                    Disease.Create("Zoonotic Influenza A Viruses", "", classification),
                    Disease.Create("Zoonotic Tuberculosis", "", classification),
                    Disease.Create("Trypanosomiasis", "", classification),
                    Disease.Create("Yellow Fever", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(zonoticSpecies);
                await _context.Diseases.AddRangeAsync(zonoticDiseases);

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
                classification = "Avian diseases";

                var poultrySpecies = Species.Create("Avian");
                var poultryDiseases = new List<Disease>
                {
                    Disease.Create("Avian chlamydiosis", "", classification),
                    Disease.Create("Avian infectious bronchitis", "", classification),
                    Disease.Create("Avian infectious laryngotracheitis", "", classification),
                    Disease.Create("Coccidiosis", "", classification),
                    Disease.Create("Duck virus hepatitis", "", classification),
                    Disease.Create("Fowl typhoid", "", classification),
                    Disease.Create("Highly pathogenic avian influenza", "", classification),
                    Disease.Create("Avian mycoplasmosis", "", classification),
                    Disease.Create("Newcastle disease", "", classification),
                    Disease.Create("Infectious bursal disease", "", classification),
                    Disease.Create("Pullorum disease", "", classification),
                    Disease.Create("Salmonellosis", "", classification),
                    Disease.Create("Turkey rhinotracheitis", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(poultrySpecies);
                await _context.Diseases.AddRangeAsync(poultryDiseases);

                // Bee diseases
                classification = "Apidae diseases";

                var beesSpecies = Species.Create("Apidae");
                var beesDiseases = new List<Disease>
                {
                    Disease.Create("Infection of honey bees with Melissococcus plutonius (European foulbrood)", "", classification),
                    Disease.Create("Infection of honey bees with Paenibacillus larvae (American foulbrood)", "", classification),
                    Disease.Create("Infestation of honey bees with Acarapis woodi", "", classification),
                    Disease.Create("Infestation of honey bees with Tropilaelaps spp", "", classification),
                    Disease.Create("Infestation of honey bees with Varroa spp. (Varroosis)", "", classification),
                    Disease.Create("Infestation with Aethina tumida (Small hive beetle)", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(beesSpecies);
                await _context.Diseases.AddRangeAsync(beesDiseases);

                // Camel diseases
                classification = "Camelids diseases";

                var camelSpecies = Species.Create("Camelids");
                var camelDiseases = new List<Disease>
                {
                    Disease.Create("Anthrax", "", classification),
                    Disease.Create("Camelpox", "", classification),
                    Disease.Create("Contagious skin necrosis", "", classification),
                    Disease.Create("Brucellosis", "", classification),
                    Disease.Create("Salmonellosis", "", classification),
                    Disease.Create("Pasteurellosis", "", classification),
                    Disease.Create("Rift Valley fever", "", classification)
                }.OrderBy(d => d.Name);

                await _context.Species.AddAsync(camelSpecies);
                await _context.Diseases.AddRangeAsync(camelDiseases);

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
                    Species.Create("Caprine"),
                    Species.Create("Bovine"),
                    Species.Create("Leporids"),
                    Species.Create("Ovine"),
                    Species.Create("Equine"),
                    Species.Create("Swine"),
                    Species.Create("Fish"),
                    Species.Create("Avian"),
                    Species.Create("Apidae"),
                    Species.Create("Camelids"),
                    Species.Create("Canine"),
                    Species.Create("Zonotic"),
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
                // For when you need to seed directly from your pc
                var dataText = File.ReadAllText("/Users/adaorajiaku/RAHC/rahis/src/Infrastructure/Persistence/SeedData/countryRegions.json");
                //var dataText = File.ReadAllText(_filePath);
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

    private async Task SeedUserAsync()
    {

        try
        {
            // Parse json into data class
            var fileName = "userSeed.json";
            var _filePath = Path.Combine(GetRootPath(), "Infrastructure\\Persistence\\SeedData", fileName);
            // For when you need to seed directly from your pc
            var dataText = File.ReadAllText("/Users/adaorajiaku/RAHC/rahis/src/Infrastructure/Persistence/SeedData/userSeed.json");
            //var dataText = File.ReadAllText(_filePath);
            var userSeedData = JsonConvert.DeserializeObject<List<UserData>>(dataText);


            var administratorRole = new IdentityRole(SecurityRoles.SuperAdmin);
            var reporterRole = new IdentityRole(SecurityRoles.Reporter);
            var cvoRole = new IdentityRole(SecurityRoles.ChiefVeterinaryOfficer);

            foreach (var user in userSeedData)
            {
        
                if (string.IsNullOrEmpty(user.email)) continue;
                
                _logger.LogInformation("user here is ", user);
                var country = await _context.Countries.Where(x => !x.IsDeleted && x.Name.Equals(user.country)).FirstOrDefaultAsync();
                
                if (country == null) continue;

                char[] separators = { ' ' };
                string firstName= user.name.Split(separators, 2)[0];
                string lastName = user.name.Split(separators, 2)[1];

                var newUser = new ApplicationUser
                {
                    UserName = user.email,
                    Email = user.email,
                    FirstName = firstName,
                    LastName = lastName,
                    CountryId = country.Id
                };


                if (_userManager.Users.All(u => !u.UserName.Equals(user.email)))
                {
                    await _userManager.CreateAsync(newUser, "Admin321!");
                    if ( user.roles.Equals("Reporter"))
                    {
                        await _userManager.AddToRolesAsync(newUser, new[] {reporterRole.Name});
                    } else if (user.roles.Equals("Chief Veterinary Officer"))
                    {
                        await _userManager.AddToRolesAsync(newUser, new[] {cvoRole.Name});
                    } else if (user.roles.Equals("Super Admin"))
                    {
                        await _userManager.AddToRolesAsync(newUser, new[] {administratorRole.Name});
                    }
                }

                await _context.SaveChangesAsync();
            }
        }
        catch (Exception ex)
        {
            throw new BusinessRuleException("DbInitializer", ex.Message ?? "Error occured while seeding users.");
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
