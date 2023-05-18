import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  AddSpeciesClient,
  AddSpeciesCommand,
  GetSpeciesClient,
  IAddSpeciesCommand,
  IUpdateSpeciesClient,
  IUpdateSpeciesCommand,
  UpdateSpeciesClient,
  UpdateSpeciesCommand,
} from '../web-api-client';

@Injectable({
  providedIn: 'root',
})
export class SpeciesService {
  // Clients
  getSpecies: GetSpeciesClient;
  addSpeciesClient: AddSpeciesClient;
  updaeSpeciesClient: UpdateSpeciesClient;

  constructor(http: HttpClient) {
    this.getSpecies = new GetSpeciesClient(http);
    this.addSpeciesClient = new AddSpeciesClient(http);
    this.updaeSpeciesClient = new UpdateSpeciesClient(http);
  }

  getAllSpecies() {
    return this.getSpecies.handle();
  }

  addSpecies(payload: IAddSpeciesCommand) {
    var request = new AddSpeciesCommand({
      name: payload.name,
    });
    return this.addSpeciesClient.handle(request);
  }

  updateSpecies(payload: IUpdateSpeciesCommand) {
    var request = new UpdateSpeciesCommand({
      id: payload.id,
      name: payload.name,
    });

    return this.updaeSpeciesClient.handle(request);
  }
}
