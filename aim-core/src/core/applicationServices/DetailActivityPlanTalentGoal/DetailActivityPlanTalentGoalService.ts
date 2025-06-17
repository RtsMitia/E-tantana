import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IDetailActivityPlanTalentGoalRepository } from 'src/core/domainServices/DetailActivityPlanTalentGoal/IDetailActivityPlanTalentGoalRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IDetailActivityPlanTalentGoalService } from './IDetailActivityPlanTalentGoalService';

@Injectable()
export class DetailActivityPlanTalentGoalService
    extends GeneralDtoService
    implements IDetailActivityPlanTalentGoalService
{
    constructor(
        @Inject(
            REPOSITORY_MAPPING_TOKEN.DETAILACTIVITYPLANTALENTGOAL_REPOSITORY,
        )
        private readonly detailActivityPlanTalentGoalRepository: IDetailActivityPlanTalentGoalRepository,
    ) {
        super(detailActivityPlanTalentGoalRepository);
    }

    async createDetailActivityPlanTalentGoal(data) {
        return await this.detailActivityPlanTalentGoalRepository.createDetailActivityPlanTalentGoal(
            data,
        );
    }
}
