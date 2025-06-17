import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivityPlanService } from 'src/core/applicationServices/ActivityPlan/ActivityPlanService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { ActivityPlan } from 'src/core/domains/ActivityPlan/ActivityPlan';
import { ActivityPlanRepository } from 'src/infrastructure/repositories/ActivityPlan/ActivityPlanRepository';
import { ActivityPlanController } from 'src/ui/Portal/ActivityPlan/ActivityPlanController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
import { DetailActivityPlanGoalModule } from './detail-activity-plan-goal.module';
import { DetailActivityPlanResponsibleModule } from './detail-activity-plan-responsible.module';
import { DetailActivityPlanTalentGoalModule } from './detail-activity-plan-talent-goal.module';
import { DetailActivityPlanModule } from './detail-activity-plan.module';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.ACTIVITYPLAN_SERVICE,
            useClass: ActivityPlanService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.ACTIVITYPLAN_REPOSITORY,
            useClass: ActivityPlanRepository,
        },
    ],
    controllers: [ActivityPlanController],
    imports: [
        TypeOrmModule.forFeature([ActivityPlan]),
        DetailActivityPlanModule,
        DetailActivityPlanGoalModule,
        DetailActivityPlanTalentGoalModule,
        DetailActivityPlanResponsibleModule,
    ],
})
export class ActivityPlanModule {}
