import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from 'src/core/applicationServices/Project/ProjectService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { Project } from 'src/core/domains/Project/Project';
import { ProjectRepository } from 'src/infrastructure/repositories/Project/ProjectRepository';
import { ProjectController } from 'src/ui/Portal/Project/ProjectController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { ProjectActivityModule } from './project-activity.module';
import { ProjectGoalModule } from './project-goal.module';
import { ProjectManagerModule } from './project-manager.module';
import { ProjectPartnerModule } from './project-partner.module';
import { ProjectResultModule } from './project-result.module';
import { ProjectToolModule } from './project-tool.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECT_SERVICE,
            useClass: ProjectService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECT_REPOSITORY,
            useClass: ProjectRepository,
        },
    ],
    controllers: [ProjectController],
    imports: [
        TypeOrmModule.forFeature([Project]),
        ProjectGoalModule,
        ProjectResultModule,
        ProjectPartnerModule,
        ProjectManagerModule,
        ProjectActivityModule,
        ProjectToolModule,
    ],
})
export class ProjectModule {}
