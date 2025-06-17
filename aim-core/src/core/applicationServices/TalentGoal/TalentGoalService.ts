import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { JoinProperties } from 'src/core/domains/JoinProperties/JoinProperties';
import { ITalentGoalRepository } from 'src/core/domainServices/TalentGoal/ITalentGoalRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { ITalentGoalService } from './ITalentGoalService';

@Injectable()
export class TalentGoalService
    extends GeneralDtoService
    implements ITalentGoalService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.TALENTGOAL_REPOSITORY)
        private readonly talentGoalRepository: ITalentGoalRepository,
    ) {
        super(talentGoalRepository);
    }

    fetchAllWithCriteria(
        criteria,
        joinProperties: JoinProperties[],
    ): Promise<unknown> {
        return this.talentGoalRepository.findAllWithCriteria(
            criteria,
            joinProperties,
        );
    }
}
