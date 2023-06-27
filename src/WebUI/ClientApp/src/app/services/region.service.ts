import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    AddRegionClient,
    AddRegionCommand,
    DeleteRegionClient,
    DeleteRegionCommand,
    GetCommunitiesClient,
    GetCountriesClient,
    GetDistrictsClient,
    GetMunicipalitiesClient,
    GetRegionsClient,
    IAddRegionCommand,
    IDeleteRegionCommand,
    RegionDto,
} from '../web-api-client';
import { Observable, of } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class RegionService {
    // Clients
    getCommunitiesClient: GetCommunitiesClient;
    getDistrictsClient: GetDistrictsClient;
    getMunicipalitiesClient: GetMunicipalitiesClient;
    getRegionsClient: GetRegionsClient;
    getCountriesClient: GetCountriesClient;
    addRegionClient: AddRegionClient;
    deleteRegionClient: DeleteRegionClient;

    constructor(http: HttpClient) {
        this.getCommunitiesClient = new GetCommunitiesClient(http);
        this.getDistrictsClient = new GetDistrictsClient(http);
        this.getMunicipalitiesClient = new GetMunicipalitiesClient(http);
        this.getRegionsClient = new GetRegionsClient(http);
        this.getCountriesClient = new GetCountriesClient(http);
        this.addRegionClient = new AddRegionClient(http);
        this.deleteRegionClient = new DeleteRegionClient(http);
    }

    getAllCommunities(districtId: number | undefined) {
        return this.getCommunitiesClient.handle(districtId);
    }

    getAllDistricts(municipalityId: number | undefined) {
        return this.getDistrictsClient.handle(municipalityId);
    }

    getAllMunicipalities(regionId: number | undefined) {
        return this.getMunicipalitiesClient.handle(regionId);
    }

    getAllRegions(countryId: number | undefined) {
        return this.getRegionsClient.handle(countryId);
    }

    addRegion(payload: IAddRegionCommand): Observable<RegionDto> {
        const request = new AddRegionCommand(payload);

        return this.addRegionClient.handle(request);
    }

    deleteRegion(payload: IDeleteRegionCommand) {
        return this.deleteRegionClient.handle(new DeleteRegionCommand(payload));
    }

    getAllCountries() {
        return this.getCountriesClient.handle();
    }
}
