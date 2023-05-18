import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AddRegionClient,
  AddRegionCommand,
  GetCountriesClient,
  GetRegionsClient,
  IAddRegionCommand,
  RegionDto,
} from '../web-api-client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RegionsService {
  // Clients
  getRegions: GetRegionsClient;
  getCountries: GetCountriesClient;
  addRegionClient: AddRegionClient;

  constructor(private http: HttpClient) {
    this.getRegions = new GetRegionsClient(http);
    this.getCountries = new GetCountriesClient(http);
    this.addRegionClient = new AddRegionClient(http);
  }

  getAllRegions(countryId: number | undefined) {
    return this.getRegions.handle(countryId);
  }

  addRegion(payload: IAddRegionCommand): Observable<RegionDto> {
    const request = new AddRegionCommand({
      name: payload.name,
      code: payload.code,
      countryId: payload.countryId,
    });

    return this.addRegionClient.handle(request);
  }

  getAllCountries() {
    return this.getCountries.handle();
  }
}
