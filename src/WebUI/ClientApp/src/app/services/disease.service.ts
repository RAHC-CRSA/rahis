import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddDiseaseClient,
  AddDiseaseCommand,
  GetDiseasesClient,
  IAddDiseaseCommand,
} from '../web-api-client';

@Injectable({
  providedIn: 'root',
})
export class DiseaseService {
  // Clients
  getDiseases: GetDiseasesClient;
  addDiseaseClient: AddDiseaseClient;

  constructor(private http: HttpClient) {
    this.getDiseases = new GetDiseasesClient(http);
    this.addDiseaseClient = new AddDiseaseClient(http);
  }

  getAllDiseases() {
    return this.getDiseases.handle();
  }

  addDisease(payload: IAddDiseaseCommand) {
    const request = new AddDiseaseCommand({
      name: payload.name,
      code: payload.code,
      classification: payload.classification,
      zoonotic: payload.zoonotic,
    });

    return this.addDiseaseClient.handle(request);
  }
}
