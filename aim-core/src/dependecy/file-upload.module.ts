import { Module } from '@nestjs/common';
import { FileUploadService } from 'src/core/applicationServices/FileUpload/FileUploadService';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';

@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.FILEUPLOAD_SERVICE,
            useClass: FileUploadService,
        },
    ],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.FILEUPLOAD_SERVICE,
            useClass: FileUploadService,
        },
    ],
})
export class FileUploadModule {}
