import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ExcelService } from 'app/services';

@Component({
    selector: 'app-excel-import',
    templateUrl: './excel-import.component.html',
    styleUrls: ['./excel-import.component.scss'],
})
export class ExcelImportComponent {
    @Input() formData: any;

    @Output() previous = new EventEmitter();
    @Output() submit = new EventEmitter();

    constructor(private excelService: ExcelService) {}

    generateTemplate(): void {
        const columns = [
            'Country ID',
            'Region ID',
            'Municipality ID',
            'District ID',
            'Community ID',
            'Disease ID',
            'Species ID',
            'Occurrence ID',
            'Report Type',
            'Exposed',
            'Infected',
            'Deceased',
            'Human Infection',
            'Humans Exposed',
            'Stamping Out',
            'Destruction of Corpses',
            'Corpses Destroyed',
            'Disinfection',
            'Observation',
            'Observation Duration',
            'Quarantine',
            'Quarantine Duration',
            'Movement Control',
            'Movement Control Measures',
            'Treatment',
            'Treatment Details',
            'Control Measures Code',
        ]; //
        const sheetName = 'Reports';

        const prepopulatedData = [
            [
                this.formData.country,
                this.formData.region,
                this.formData.municipality,
                this.formData.district,
                this.formData.community,
                this.formData.disease,
                this.formData.species,
                this.formData.occurrence,
                this.formData.reportType,
            ],
        ];

        const workbook = this.excelService.generateExcelTemplate(
            columns,
            sheetName,
            prepopulatedData
        );

        // Save the generated template as a file
        workbook.xlsx.writeBuffer().then((buffer) => {
            this.saveAsExcelFile(buffer, sheetName);
        });
    }

    private saveAsExcelFile(buffer: ArrayBuffer, fileName: string): void {
        const blob = new Blob([buffer], {
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        });

        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${fileName}.xlsx`;
        link.click();
    }

    onFileChange(event: any): void {
        const file = event.target.files[0];

        if (file) {
            this.excelService
                .readExcelFile(file)
                .then((data) => {
                    const importData = data[1];
                    const formData = {
                        country: '',
                        region: '',
                        municipality: '',
                        district: '',
                        community: '',
                        disease: '',
                        species: '',
                        occurrence: '',
                        reportType: '',
                        exposed: 0,
                        infected: 0,
                        dead: 0,
                        humanInfection: false,
                        humansExposed: 0,
                        stampingOut: false,
                        destructionOfCorpses: false,
                        corpsesDestroyed: '',
                        disinfection: false,
                        observation: false,
                        observationDuration: '',
                        quarantine: false,
                        quarantineDuration: '',
                        movementControl: false,
                        movementControlMeasures: '',
                        treatment: false,
                        treatmentDetails: '',
                        controlMeasuresCode: '',
                        medications: [],
                        vaccinations: [],
                        tests: [],
                    };

                    Object.keys(formData).forEach((property, index) => {
                        formData[property] = importData[index];
                    });

                    formData.medications = [];
                    formData.tests = [];
                    formData.vaccinations = [];

                    this.submit.emit(formData);
                })
                .catch((error) => {
                    console.error('Error reading Excel file:', error);
                });
        }
    }

    onPrevious() {
        this.previous.emit();
    }

    onSubmit() {
        this.submit.emit({ skip: true });
    }
}
