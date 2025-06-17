import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectGoalService } from 'src/core/applicationServices/ProjectGoal/ProjectGoalService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ProjectGoal } from 'src/core/domains/ProjectGoal/ProjectGoal';
import { ProjectGoalRepository } from 'src/infrastructure/repositories/ProjectGoal/ProjectGoalRepository';
import { ProjectGoalController } from 'src/ui/Portal/ProjectGoal/ProjectGoalController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTGOAL_SERVICE,
            useClass: ProjectGoalService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.PROJECTGOAL_REPOSITORY,
            useClass: ProjectGoalRepository,
        },
    ],
    controllers: [ProjectGoalController],
    imports: [TypeOrmModule.forFeature([ProjectGoal])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.PROJECTGOAL_SERVICE,
            useClass: ProjectGoalService,
        },
    ],
})
export class ProjectGoalModule {}
