import { Inject, Injectable } from '@nestjs/common';
import { REPOSITORY_MAPPING_TOKEN } from 'src/core/CoreModuleToken';
import { IEducationGoalRepository } from 'src/core/domainServices/EducationGoal/IEducationGoalRepository';
import { GeneralDtoService } from '../GeneralDto/GeneralDtoService';
import { IEducationGoalService } from './IEducationGoalService';

@Injectable()
export class EducationGoalService
    extends GeneralDtoService
    implements IEducationGoalService
{
    constructor(
        @Inject(REPOSITORY_MAPPING_TOKEN.EDUCATIONGOAL_REPOSITORY)
        private readonly educationGoalRepository: IEducationGoalRepository,
    ) {
        super(educationGoalRepository);
    }

    async fetchAllEducationGoalsWithCriteria(criteria): Promise<unknown> {
        return await this.educationGoalRepository.findAllEducationGoalsWithCriteria(
            criteria,
        );
    }

    async fetchEducationGoalById(id: number): Promise<unknown> {
        return await this.educationGoalRepository.findEducationGoalById(id);
    }
}
