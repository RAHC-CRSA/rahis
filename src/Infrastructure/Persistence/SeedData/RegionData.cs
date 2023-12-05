namespace RegionalAnimalHealth.Infrastructure.Persistence.SeedData;
public class UserData
{
    public string country { get; set; }
    public string name { get; set; }
    public string email { get; set; }
    public string roles { get; set; }

}
public class RegionData
{
    public string Country { get; set; }
    public string Code { get; set; }
    public string Flag { get; set; }
    public List<RegionItem> Regions { get; set; }

}

public class RegionItem
{
    public string Country { get; set; }
    public string Region { get; set; }
    public string Municipality { get; set; }
    public string District { get; set; }
    public string Community { get; set; }
}


public class RegionInsert
{
    public string Name { get; set; }
    public List<MunicipalityInsert> Municipalities { get; set; }

    public RegionInsert()
    {
        
    }

    public RegionInsert(string name)
    {
        Name = name;
    }
}

public class MunicipalityInsert
{
    public string Name { get; set; }
    public List<DistrictInsert> Districts { get; set; }

    public MunicipalityInsert()
    {
        
    }

    public MunicipalityInsert(string name)
    {
        Name = name;
    }
}

public class DistrictInsert
{
    public string Name { get; set; }
    public List<CommunityInsert> Communities { get; set; }

    public DistrictInsert()
    {
        
    }

    public DistrictInsert(string name)
    {
        Name = name;
    }
}

public class CommunityInsert
{
    public string Name { get; set; }

    public CommunityInsert()
    {
        
    }

    public CommunityInsert(string name)
    {
        Name = name;
    }
}