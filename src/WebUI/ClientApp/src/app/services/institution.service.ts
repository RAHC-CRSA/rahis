import { Injectable } from '@angular/core';
import {
    AddInstitutionClient,
    AddInstitutionCommand,
    AddParaProfessionalClient,
    AddParaProfessionalCommand,
    GetInstitutionsClient,
    GetParaProfessionalsClient,
    IAddInstitutionCommand,
    IAddParaProfessionalCommand,
    InstitutionDto,
    ParaProfessionalDto,
} from '../web-api-client';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class InstitutionService {
    // Clients
    getParaProfessionalsClient: GetParaProfessionalsClient;
    getInstitutionsClient: GetInstitutionsClient;
    addParaProfessionalClient: AddParaProfessionalClient;
    addInstitutionClient: AddInstitutionClient;

    constructor(http: HttpClient) {
        this.getParaProfessionalsClient = new GetParaProfessionalsClient(http);
        this.getInstitutionsClient = new GetInstitutionsClient(http);
        this.addParaProfessionalClient = new AddParaProfessionalClient(http);
        this.addInstitutionClient = new AddInstitutionClient(http);
    }

    getAllParaProfessionals(institutionId: number | undefined) {
        return this.getParaProfessionalsClient.handle(institutionId);
    }

    addParaProfessional(
        payload: IAddParaProfessionalCommand
    ): Observable<ParaProfessionalDto> {
        const request = new AddParaProfessionalCommand(payload);

        return this.addParaProfessionalClient.handle(request);
    }

    getAllInstitutions() {
        return this.getInstitutionsClient.handle();
    }

    addInstitution(
        payload: IAddInstitutionCommand
    ): Observable<InstitutionDto> {
        const request = new AddInstitutionCommand(payload);

        return this.addInstitutionClient.handle(request);
    }
}
