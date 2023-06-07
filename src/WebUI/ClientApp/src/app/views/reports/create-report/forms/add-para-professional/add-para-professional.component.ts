import {
    Component,
    EventEmitter,
    OnInit,
    AfterContentChecked,
    Output,
    ChangeDetectorRef,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ReportsState } from 'app/modules/reports/store';
import {
    addInstitution,
    loadInstitutions,
} from 'app/modules/reports/store/actions';
import { getInstitutions } from 'app/modules/reports/store/selectors';
import { IAddInstitutionCommand, InstitutionDto } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-add-para-professional',
    templateUrl: './add-para-professional.component.html',
    styleUrls: ['./add-para-professional.component.scss'],
})
export class AddParaProfessionalComponent
    implements OnInit, AfterContentChecked
{
    @Output() submit = new EventEmitter();

    otherOption: string = 'Other (add a new professional)';
    newInstitution: boolean = false;

    institutionControl = new FormControl();
    selectedInstitution: InstitutionDto;

    institutions$: Observable<InstitutionDto[] | null | undefined>;
    institutions: InstitutionDto[];
    filteredInstitutions: Observable<InstitutionDto[]>;

    professionalForm: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private store: Store<ReportsState>,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.initData();
    }

    initForm() {
        this.professionalForm = this.formBuilder.group({});
    }

    initData() {
        this.store.dispatch(loadInstitutions());
        this.institutions$ = this.store.select(getInstitutions);
        this.institutions$.subscribe((institutions) => {
            this.institutions = [
                ...institutions,
                new InstitutionDto({ id: null, name: this.otherOption }),
            ];

            this.filteredInstitutions =
                this.institutionControl.valueChanges.pipe(
                    startWith({} as InstitutionDto),
                    map((professional) =>
                        professional && typeof professional === 'object'
                            ? professional.name
                            : professional
                    ),
                    map((name: string) =>
                        name
                            ? this._filterInstitution(name)
                            : this.institutions.slice()
                    )
                );
        });
    }

    private _filterInstitution(name: string): InstitutionDto[] {
        return this.institutions.filter(
            (option) =>
                option.name.toLowerCase().indexOf(name.toLowerCase()) === 0
        );
    }

    displayInstitutionFn(institution: InstitutionDto): string {
        return institution ? institution.name : '';
    }

    updateSelectedInstitution(event: any) {
        this.selectedInstitution = event.option.value;
        const institution: InstitutionDto = event.option.value;

        this.newInstitution =
            institution.name.toLowerCase() === this.otherOption.toLowerCase();

        this.professionalForm.patchValue({ institutionId: institution.id });

        if (this.newInstitution) this.institutionControl.disable();
    }

    onSubmitInstitution(institution: IAddInstitutionCommand) {
        this.store.dispatch(addInstitution({ payload: institution }));

        this.institutionControl.enable();
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    onSubmit() {}
}
