import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
    AddRegionClient,
    AddRegionCommand,
    DeleteRegionClient,
    DeleteRegionCommand,
    GetCountriesClient,
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
    getRegionsClient: GetRegionsClient;
    getCountriesClient: GetCountriesClient;
    addRegionClient: AddRegionClient;
    deleteRegionClient: DeleteRegionClient;

    constructor(http: HttpClient) {
        this.getRegionsClient = new GetRegionsClient(http);
        this.getCountriesClient = new GetCountriesClient(http);
        this.addRegionClient = new AddRegionClient(http);
        this.deleteRegionClient = new DeleteRegionClient(http);
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
