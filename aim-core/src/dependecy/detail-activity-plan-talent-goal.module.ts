import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailActivityPlanTalentGoalService } from 'src/core/applicationServices/DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoalService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { DetailActivityPlanTalentGoal } from 'src/core/domains/DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoal';
import { DetailActivityPlanTalentGoalRepository } from 'src/infrastructure/repositories/DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoalRepository';
import { DetailActivityPlanTalentGoalController } from 'src/ui/Portal/DetailActivityPlanTalentGoal/DetailActivityPlanTalentGoalController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANTALENTGOAL_SERVICE,
            useClass: DetailActivityPlanTalentGoalService,
        },
        {
            provide:
                REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLANTALENTGOAL_REPOSITORY,
            useClass: DetailActivityPlanTalentGoalRepository,
        },
    ],
    controllers: [DetailActivityPlanTalentGoalController],
    imports: [TypeOrmModule.forFeature([DetailActivityPlanTalentGoal])],
    exports: [
        {
            provide: SERVICE_MAPPING_TOKEN.DETAILACTIVITYPLANTALENTGOAL_SERVICE,
            useClass: DetailActivityPlanTalentGoalService,
        },
    ],
})
export class DetailActivityPlanTalentGoalModule {}
