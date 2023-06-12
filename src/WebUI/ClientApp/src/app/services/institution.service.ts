import { Injectable } from '@angular/core';
import {
    AddInstitutionClient,
    AddInstitutionCommand,
    AddParaProfessionalClient,
    AddParaProfessionalCommand,
    DeleteInstitutionClient,
    DeleteInstitutionCommand,
    DeleteParaProfessionalClient,
    DeleteParaProfessionalCommand,
    GetInstitutionsClient,
    GetParaProfessionalsClient,
    IAddInstitutionCommand,
    IAddParaProfessionalCommand,
    IDeleteInstitutionCommand,
    IDeleteParaProfessionalCommand,
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
    deleteParaProfessionalClient: DeleteParaProfessionalClient;
    addInstitutionClient: AddInstitutionClient;
    deleteInstitutionClient: DeleteInstitutionClient;

    constructor(http: HttpClient) {
        this.getParaProfessionalsClient = new GetParaProfessionalsClient(http);
        this.getInstitutionsClient = new GetInstitutionsClient(http);
        this.addParaProfessionalClient = new AddParaProfessionalClient(http);
        this.deleteParaProfessionalClient = new DeleteParaProfessionalClient(
            http
        );
        this.addInstitutionClient = new AddInstitutionClient(http);
        this.deleteInstitutionClient = new DeleteInstitutionClient(http);
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

    deleteParaProfessional(payload: IDeleteParaProfessionalCommand) {
        return this.deleteParaProfessionalClient.handle(
            new DeleteParaProfessionalCommand(payload)
        );
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

    deleteInstitution(payload: IDeleteInstitutionCommand) {
        return this.deleteInstitutionClient.handle(
            new DeleteInstitutionCommand(payload)
        );
    }
}
