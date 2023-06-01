import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  CreateReportClient,
  CreateReportCommand,
  GetOccurrencesClient,
  GetReportClient,
  GetReportsClient,
  ICreateReportCommand,
} from '../web-api-client';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  // Clients
  getOccurrences: GetOccurrencesClient;
  createReportClient: CreateReportClient;
  getReportsClient: GetReportsClient;
  getReportClient: GetReportClient;

  constructor(http: HttpClient) {
    this.getOccurrences = new GetOccurrencesClient(http);
    this.createReportClient = new CreateReportClient(http);
    this.getReportsClient = new GetReportsClient(http);
    this.getReportClient = new GetReportClient(http);
  }

  getAllOccurrences() {
    return this.getOccurrences.handle();
  }

  createReport(payload: ICreateReportCommand) {
    const request = new CreateReportCommand(payload);

    return this.createReportClient.handle(request);
  }

  getAllReports() {
    return this.getReportsClient.handle();
  }

  getReport(id: number) {
    return this.getReportClient.handle(id);
  }
}