import { Injectable } from '@nestjs/common';
import { read, utils, WorkBook } from 'xlsx';
import { IExcelService } from './IExcelService';

@Injectable()
export class ExcelService implements IExcelService {
    readingExcel(file: Express.Multer.File) {
        const workBook: WorkBook = read(file.buffer, {
            type: 'buffer',
            cellDates: true,
            cellNF: false,
        });

        const sheet = workBook.Sheets[workBook.SheetNames[0]];

        const jsonData = utils.sheet_to_json(sheet, {
            range: 2,      // zero-based index: 2 means start reading from row 3
            header: 2,     // tells xlsx to use the first row (in the range) as keys
            defval: '',    // avoid undefined values
            raw: false,    // nicely parse dates, etc.
        });
        
        return jsonData;
    }
}
