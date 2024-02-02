import {
    AfterContentChecked,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fuseAnimations } from '@fuse/animations';

@Component({
    selector: 'app-infection-info',
    templateUrl: './infection-info.component.html',
    styleUrls: ['./infection-info.component.scss'],
    animations: fuseAnimations,
})
export class InfectionInfoComponent implements OnInit, AfterContentChecked {
    humanInfection: boolean;
    @Input() formData: any;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    occurrences: any[];

    infectionInfo: FormGroup;

    constructor(
        private formBuilder: FormBuilder,
        private changeDetector: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.humanInfection = this.formData?.humanInfection;
        this.initForm();
        this.initConditionalValidation();
    }

    initForm() {
        this.infectionInfo = this.formBuilder.group({
            numberExposed: [this.formData.exposed, Validators.required],
            numberInfected: [this.formData.infected, Validators.required],
            numberDead: [this.formData.dead, Validators.required],
            humanInfection: [
                this.formData.humanInfection,
                Validators.compose([Validators.required]),
            ],
            humansExposed: [this.formData.humansExposed],
        });
    }

    initConditionalValidation() {
        this.infectionInfo
            .get('humanInfection')
            ?.valueChanges.subscribe((value) => {
                if (value) {
                    this.infectionInfo
                        .get('humansExposed')
                        ?.setValidators([Validators.required]);
                } else {
                    this.infectionInfo.controls.humansExposed?.clearValidators();
                }

                this.infectionInfo.controls.humansExposed?.updateValueAndValidity();
            });
    }

    get f() {
        return this.infectionInfo.value;
    }

    ngAfterContentChecked(): void {
        this.changeDetector.detectChanges();
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit(this.infectionInfo.value);
    }
}
