import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectActivityService } from 'src/core/applicationServices/ProjectActivity/ProjectActivityService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectActivity } from 'src/core/domains/ProjectActivity/ProjectActivity';
import { ProjectActivityRepository } from 'src/infrastructure/repositories/ProjectActivity/ProjectActivityRepository';
import { ProjectActivityController } from 'src/ui/Portal/ProjectActivity/ProjectActivityController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTACTIVITY_SERVICE,
            useClass: ProjectActivityService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTACTIVITY_REPOSITORY,
            useClass: ProjectActivityRepository,
        },
    ],
    controllers: [ProjectActivityController],
    imports: [TypeOrmModule.forFeature([ProjectActivity])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTACTIVITY_SERVICE,
            useClass: ProjectActivityService,
        },
    ],
})
export class ProjectActivityModule {}
