import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';
import { Store } from '@ngrx/store';
import { ReportState } from 'app/modules/reports/store';
import { loadOccurrences } from 'app/modules/reports/store/actions';
import { getOccurrences } from 'app/modules/reports/store/selectors';
import { OccurrenceDto } from 'app/web-api-client';
import { Observable, map, startWith } from 'rxjs';

@Component({
    selector: 'app-occurrence-info',
    templateUrl: './occurrence-info.component.html',
    styleUrls: ['./occurrence-info.component.scss'],
    animations: fuseAnimations,
})
export class OccurrenceInfoComponent implements OnInit, AfterContentChecked {
    @Input() formData: any;

    otherOption: string = 'Other (this is a new occurrence)';
    newOccurrence: boolean = false;

    occurrenceControl = new FormControl();
    selectedOccurrence: OccurrenceDto;

    occurrences$: Observable<OccurrenceDto[] | null | undefined>;
    occurrences: OccurrenceDto[];
    filteredOccurrences: Observable<OccurrenceDto[]>;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    occurrenceInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private changeDetector: ChangeDetectorRef,
        private store: Store<ReportState>
    ) {}

    ngOnInit() {
        this.initForm();
        this.initData();
        this.initConditionalValidation();
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    initForm() {
        this.newOccurrence = this.formData.newOccurrence;
        this.occurrenceInfo = this.formBuilder.group({
            newOccurrence: [this.newOccurrence],
            occurrence: [this.formData.occurrence, Validators.required],
        });
    }

    initData() {
        this.store.dispatch(loadOccurrences());
        this.occurrences$ = this.store.select(getOccurrences);
        this.occurrences$.subscribe((occurrences) => {
            this.occurrences = [
                ...occurrences,
                new OccurrenceDto({ id: null, title: this.otherOption }),
            ];

            this.filteredOccurrences = this.occurrenceControl.valueChanges.pipe(
                startWith({} as OccurrenceDto),
                map((occurrence) =>
                    occurrence && typeof occurrence === 'object'
                        ? occurrence.title
                        : occurrence
                ),
                map((name: string) =>
                    name
                        ? this._filterOccurrence(name)
                        : this.occurrences.slice()
                )
            );
        });
    }

    initConditionalValidation() {
        this.occurrenceInfo
            .get('newOccurrence')
            ?.valueChanges.subscribe((value) => {
                if (!value) {
                    this.occurrenceInfo
                        .get('occurrence')
                        ?.setValidators([Validators.required]);
                } else {
                    this.occurrenceInfo.controls.occurrence?.clearValidators();
                }

                this.occurrenceInfo.controls.occurrence?.updateValueAndValidity();
            });
    }

    private _filterOccurrence(title: string): OccurrenceDto[] {
        return this.occurrences.filter(
            (option) =>
                option.title.toLowerCase().indexOf(title.toLowerCase()) === 0
        );
    }

    displayOccurrenceFn(occurrence: OccurrenceDto): string {
        return occurrence ? occurrence.title : '';
    }

    updateSelectedOccurrence(event: any) {
        this.selectedOccurrence = event.option.value;
        const occurrence: OccurrenceDto = event.option.value;

        this.newOccurrence =
            occurrence.title.toLowerCase() === this.otherOption.toLowerCase();

        this.occurrenceInfo.patchValue({
            occurrence: occurrence.id,
            newOccurrence: this.newOccurrence,
        });

        if (this.newOccurrence) this.occurrenceControl.disable();
    }

    onCheckOccurrence(isNew: boolean) {
        this.newOccurrence = isNew;

        this.occurrenceInfo.patchValue({
            newOccurrence: this.newOccurrence,
        });

        if (!this.newOccurrence) {
            this.selectedOccurrence = null;
            this.occurrenceControl.setValue('', { emitEvent: true });
            this.occurrenceControl.enable();
            this.occurrenceInfo.patchValue(
                { occurrence: '' },
                { emitEvent: true }
            );
        }
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.occurrenceInfo.value);
    }
}
