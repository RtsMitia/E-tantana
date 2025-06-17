import { Module } from '@nestjs/common';
import { ExcelService } from 'src/core/applicationServices/Excel/ExcelService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Module({
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.EXCEL_SERVICE,
            useClass: ExcelService,
        },
    ],
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.EXCEL_SERVICE,
            useClass: ExcelService,
        },
    ],
})
export class ExcelModule {}
