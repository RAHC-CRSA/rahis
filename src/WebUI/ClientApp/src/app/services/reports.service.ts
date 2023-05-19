import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  AddRegionClient,
  AddRegionCommand,
  CreateReportClient,
  CreateReportCommand,
  GetCountriesClient,
  GetOccurrencesClient,
  GetRegionsClient,
  GetReportsClient,
  IAddRegionCommand,
  ICreateReportCommand,
  RegionDto,
} from '../web-api-client';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  // Clients
  getOccurrences: GetOccurrencesClient;
  createReportClient: CreateReportClient;
  getReportsClient: GetReportsClient;
  getReport: GetReportsClient;

  constructor(http: HttpClient) {
    this.getOccurrences = new GetOccurrencesClient(http);
    this.createReportClient = new CreateReportClient(http);
    this.getReportsClient = new GetReportsClient(http);
  }

  getAllOccurrences() {
    return this.getOccurrences.handle();
  }

  createReport(payload: ICreateReportCommand) {
    const request = new CreateReportCommand({
      regionId: payload.regionId,
      speciesId: payload.speciesId,
      diseaseId: payload.diseaseId,
      occurrenceId: payload.occurrenceId,
      numberExposed: payload.numberExposed,
      numberInfected: payload.numberInfected,
      mortality: payload.mortality,
    });

    return this.createReportClient.handle(request);
  }

  getAllReports() {
    return this.getReportsClient.handle();
  }
}
