import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TalentGoalService } from 'src/core/applicationServices/TalentGoal/TalentGoalService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { TalentGoal } from 'src/core/domains/TalentGoal/TalentGoal';
import { TalentGoalRepository } from 'src/infrastructure/repositories/TalentGoal/TalentGoalRepository';
import { TalentGoalController } from 'src/ui/Portal/TalentGoal/TalentGoalController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.TALENTGOAL_SERVICE,
            useClass: TalentGoalService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.TALENTGOAL_REPOSITORY,
            useClass: TalentGoalRepository,
        },
    ],
    controllers: [TalentGoalController],
    imports: [TypeOrmModule.forFeature([TalentGoal])],
})
export class TalentGoalModule {}
