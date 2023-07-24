import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { ParaProfessionalsState } from 'app/modules/professionals/store';
import {
    loadParaProfessionals,
    updateParaProfessional,
} from 'app/modules/professionals/store/actions';
import {
    getParaProfessionals,
    getParaProfessionalsLoaded,
    getParaProfessionalsLoading,
} from 'app/modules/professionals/store/selectors';
import { getFeedback } from 'app/modules/reports/store/selectors';
import {
    IUpdateParaProfessionalCommand,
    ParaProfessionalDto,
    ServerResponse,
} from 'app/web-api-client';
import { Observable, map } from 'rxjs';

@Component({
    selector: 'app-edit-professional',
    templateUrl: './edit-professional.component.html',
    styleUrls: ['./edit-professional.component.scss'],
})
export class EditProfessionalComponent implements OnInit {
    professionalId: number;
    professional: ParaProfessionalDto;
    professionalForm: FormGroup;
    loading$: Observable<boolean>;
    feedback$: Observable<ServerResponse | null | undefined>;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ParaProfessionalsState>,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.route.paramMap.subscribe((params: ParamMap) => {
            this.professionalId = +params.get('id');
        });

        this.initForm();
        this.initData();
    }

    initForm() {
        this.professionalForm = this.formBuilder.group({
            position: ['', [Validators.required]],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', [Validators.required]],
        });
    }

    initData() {
        this.store.select(getParaProfessionalsLoaded).subscribe((loaded) => {
            if (!loaded) {
                this.store.dispatch(
                    loadParaProfessionals({ payload: undefined })
                );
            }
        });

        this.store.select(getParaProfessionals).subscribe((professionals) => {
            this.professional = professionals.find(
                (p) => p.id == this.professionalId
            );

            this.professionalForm.patchValue(this.professional);
        });

        this.loading$ = this.store.select(getParaProfessionalsLoading);
        this.feedback$ = this.store.select(getFeedback);
    }

    get f() {
        return this.professionalForm?.controls;
    }

    submit() {
        const payload: IUpdateParaProfessionalCommand = {
            paraProfessionalId: this.professional.id,
            position: this.f.position.value,
            email: this.f.email.value,
            phone: this.f.phone.value,
        };

        this.store.dispatch(updateParaProfessional({ payload }));
    }
}
