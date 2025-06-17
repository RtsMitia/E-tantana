import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectImageService } from 'src/core/applicationServices/ProjectImage/ProjectImageService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectImage } from 'src/core/domains/ProjectImage/ProjectImage';
import { ProjectImageRepository } from 'src/infrastructure/repositories/ProjectImage/ProjectImageRepository';
import { ProjectImageController } from 'src/ui/Portal/ProjectImage/ProjectImageController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { FileUploadModule } from './file-upload.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTIMAGE_SERVICE,
            useClass: ProjectImageService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTIMAGE_REPOSITORY,
            useClass: ProjectImageRepository,
        },
    ],
    controllers: [ProjectImageController],
    imports: [TypeOrmModule.forFeature([ProjectImage]), FileUploadModule],
})
export class ProjectImageModule {}
