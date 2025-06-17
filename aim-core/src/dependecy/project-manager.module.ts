import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectManagerService } from 'src/core/applicationServices/ProjectManager/ProjectManagerService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectManager } from 'src/core/domains/ProjectManager/ProjectManager';
import { ProjectManagerRepository } from 'src/infrastructure/repositories/ProjectManager/ProjectManagerRepository';
import { ProjectManagerController } from 'src/ui/Portal/ProjectManager/ProjectManagerController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTMANAGER_SERVICE,
            useClass: ProjectManagerService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTMANAGER_REPOSITORY,
            useClass: ProjectManagerRepository,
        },
    ],
    controllers: [ProjectManagerController],
    imports: [TypeOrmModule.forFeature([ProjectManager])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTMANAGER_SERVICE,
            useClass: ProjectManagerService,
        },
    ],
})
export class ProjectManagerModule {}
