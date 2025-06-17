import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailActivityPlanGoalService } from 'src/core/applicationServices/DetailActivityPlanGoal/DetailActivityPlanGoalService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { DetailActivityPlanGoal } from 'src/core/domains/DetailActivityPlanGoal/DetailActivityPlanGoal';
import { DetailActivityPlanGoalRepository } from 'src/infrastructure/repositories/DetailActivityPlanGoal/DetailActivityPlanGoalRepository';
import { DetailActivityPlanGoalController } from 'src/ui/Portal/DetailActivityPlanGoal/DetailActivityPlanGoalController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANGOAL_SERVICE,
            useClass: DetailActivityPlanGoalService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLANGOAL_REPOSITORY,
            useClass: DetailActivityPlanGoalRepository,
        },
    ],
    controllers: [DetailActivityPlanGoalController],
    imports: [TypeOrmModule.forFeature([DetailActivityPlanGoal])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANGOAL_SERVICE,
            useClass: DetailActivityPlanGoalService,
        },
    ],
})
export class DetailActivityPlanGoalModule {}
