import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IDetailActivityPlanGoalRepository } from 'src/core/domainServices/DetailActivityPlanGoal/IDetailActivityPlanGoalRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IDetailActivityPlanGoalService } from './IDetailActivityPlanGoalService';

@Injectable()
export class DetailActivityPlanGoalService
    extends GeneralDtoService
    implements IDetailActivityPlanGoalService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLANGOAL_REPOSITORY)
        private readonly detailActivityPlanGoalRepository: IDetailActivityPlanGoalRepository,
    ) {
        super(detailActivityPlanGoalRepository);
    }

    async createDetailActivityPlanGoal(data) {
        return this.detailActivityPlanGoalRepository.createDetailActivityPlanGoal(
            data,
        );
    }
}
