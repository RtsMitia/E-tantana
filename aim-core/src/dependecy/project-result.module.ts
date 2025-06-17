import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectResultService } from 'src/core/applicationServices/ProjectResult/ProjectResultService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectResult } from 'src/core/domains/ProjectResult/ProjectResult';
import { ProjectResultRepository } from 'src/infrastructure/repositories/ProjectResult/ProjectResultRepository';
import { ProjectResultController } from 'src/ui/Portal/ProjectResult/ProjectResultController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTRESULT_SERVICE,
            useClass: ProjectResultService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTRESULT_REPOSITORY,
            useClass: ProjectResultRepository,
        },
    ],
    controllers: [ProjectResultController],
    imports: [TypeOrmModule.forFeature([ProjectResult])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTRESULT_SERVICE,
            useClass: ProjectResultService,
        },
    ],
})
export class ProjectResultModule {}
