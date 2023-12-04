import { Injectable } from '@angular/core';
import { Workbook } from 'exceljs';

@Injectable({
    providedIn: 'root',
})
export class ExcelService {
    constructor() {}

    generateExcelTemplate(
        columns: string[],
        sheetName: string,
        existingData?: any[][],
        dropdownValues?: string[]
    ): Workbook {
        const workbook = new Workbook();
        const worksheet = workbook.addWorksheet(sheetName);

        // Set column headers
        worksheet.columns = columns.map((column) => {
            return { header: column, key: column, width: 15 };
        });

        // Add pre-existing data if provided
        if (existingData && existingData.length > 0) {
            existingData.forEach((rowData) => {
                worksheet.addRow(rowData);
            });
        }

        return workbook;
    }

    readExcelFile(file: File): Promise<any> {
        return new Promise((resolve, reject) => {
            const workbook = new Workbook();
            const reader = new FileReader();

            reader.onload = (event: any) => {
                const data = event.target.result;
                workbook.xlsx.load(data).then((excelData) => {
                    const worksheet = excelData.getWorksheet(1); // Assuming data is in the first worksheet
                    const rows = [];

                    worksheet.eachRow((row, rowNumber) => {
                        // Process each row as needed
                        const rowData = [];
                        row.eachCell(
                            { includeEmpty: true },
                            (cell, colNumber) => {
                                rowData[colNumber - 1] = cell.value;
                            }
                        );
                        rows.push(rowData);
                    });

                    resolve(rows);
                });
            };

            reader.onerror = (error) => {
                reject(error);
            };

            reader.readAsArrayBuffer(file);
        });
    }
}
