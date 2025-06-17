import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducationGoalService } from 'src/core/applicationServices/EducationGoal/EducationGoalService';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { EducationGoal } from 'src/core/domains/EducationGoal/EducationGoal';
import { EducationGoalRepository } from 'src/infrastructure/repositories/EducationGoal/EducationGoalRepository';
import { EducationGoalController } from 'src/ui/Portal/EducationGoal/EducationGoalController';
import { SERVICE_MAPPING_TOKEN } from 'src/ui/UiModuleToken';
@Module({
    providers: [
        {
            provide: SERVICE_MAPPING_TOKEN.EDUCATIONGOAL_SERVICE,
            useClass: EducationGoalService,
        },
        {
            provide: REPOSITORY_MAPPING_TOKEN.EDUCATIONGOAL_REPOSITORY,
            useClass: EducationGoalRepository,
        },
        EducationGoalService,
    ],
    controllers: [EducationGoalController],
    imports: [TypeOrmModule.forFeature([EducationGoal])],
})
export class EducationGoalModule {}
